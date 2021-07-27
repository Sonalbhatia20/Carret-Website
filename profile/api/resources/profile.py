from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Profile, User
from flask_restful import Resource
from binance.client import Client as BN
import json
import time
import urllib.parse
from typing import Optional, Dict, Any, List
from requests import Request, Session, Response
import hmac
from coinbase.wallet.client import Client as CB 

class FtxClient:
    _ENDPOINT = 'https://ftx.com/api/'

    def __init__(self, api_key=None, api_secret=None, subaccount_name=None) -> None:
        self._session = Session()
        self._api_key = api_key
        self._api_secret = api_secret
        self._subaccount_name = subaccount_name
        
    def _get(self, path: str, params: Optional[Dict[str, Any]] = None) -> Any:
        return self._request('GET', path, params=params)
    
    def _post(self, path: str, params: Optional[Dict[str, Any]] = None) -> Any:
        return self._request('POST', path, json=params)

    def _request(self, method: str, path: str, **kwargs) -> Any:
        request = Request(method, self._ENDPOINT + path, **kwargs)
        self._sign_request(request)
        response = self._session.send(request.prepare())
        return self._process_response(response)

    def _sign_request(self, request: Request) -> None:
        ts = int(time.time() * 1000)
        prepared = request.prepare()
        signature_payload = f'{ts}{prepared.method}{prepared.path_url}'.encode()
        if prepared.body:
            signature_payload += prepared.body
        signature = hmac.new(self._api_secret.encode(), signature_payload, 'sha256').hexdigest()
        request.headers['FTX-KEY'] = self._api_key
        request.headers['FTX-SIGN'] = signature
        request.headers['FTX-TS'] = str(ts)
        if self._subaccount_name:
            request.headers['FTX-SUBACCOUNT'] = urllib.parse.quote(self._subaccount_name)

    def _process_response(self, response: Response) -> Any:
        try:
            data = response.json()
        except ValueError:
            response.raise_for_status()
            raise
        else:
            if not data['success']:
                raise Exception(data['error'])
            return data['result']


class ProfilesApi(Resource):
    def get(self):
        profiles = Profile.objects().to_json()
        return Response(profiles, mimetype="application/json", status=200)
    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        body = request.get_json()
        user = User.objects.get(id=user_id)
        profile = Profile(**body, addedBy=user)
        profile.save()
        # user.update(push__profiles=profile)
        # user.save()
        id = profile.id
        return {'id': str(id)}, 200

class ProfileApi(Resource):
    @jwt_required()
    def put(self,id):
        user_id = get_jwt_identity()
        profile = Profile.objects.get(id=id, added_by=user_id)
        body = request.get_json()
        Profile.objects.get(id=id).update(**body)
        return '', 200
    
    @jwt_required()
    def delete(self,id):
        user_id = get_jwt_identity()
        profile = Profile.objects.get(id=id, added_by=user_id)
        profile.delete()
        return '', 200
    
    def get(self,id):
        profiles = Profile.objects.get(id=id).to_json()
        return Response(profiles, mimetype="application/json", status=200)

class AmountApi(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        profile = Profile.objects.get(added_by=user_id)
        for item in profile:
            api_key = item['apiKey']
            api_secret = item['apiSecret']
            dic={} 
            if item['exchange'] == 'Binance':
                client = BN(api_key, api_secret)
                accounts = client.get_account()
                for wallet in accounts.balances:
                    dic[str(wallet['asset'])] = 0.0
                for wallet in accounts.balances:
                    dic[str(wallet['asset'])] += float(wallet['free'])    
            elif item['exchange'] == 'Coinbase':
                client = CB(api_key, api_secret)
                accounts = client.get_accounts()
                for wallet in accounts.data:
                    key = str(wallet['balance']['currency'])
                    if key in dic:
                        dic[key] += float(wallet['balance']['amount'])
                    else:
                        dic[key] = 0.0
                        dic[key] += float(wallet['balance']['amount'])
            elif item['exchange'] == 'FTX':
                c = FtxClient(api_key=api_key, api_secret=api_secret)
                req = "wallet/all_balances"
                res = c._get(req)
                for wallet in res.main:
                    key = str(wallet['coin'])
                    if key in dic:
                        dic[key] += float(wallet['total'])
                    else:
                        dic[key] = 0.0
                        dic[key] += float(wallet['total'])
            json_object = json.dumps(dic, indent = 4)
            return Response(json_object, mimetype="application/json", status=200)  
                    

    

