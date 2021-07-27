from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from database.db import initialize_db
from flask_restful import Api
from flask import Response, request
from flask_jwt_extended import create_access_token
from database.models import User
import datetime
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import json
import random
from resources.routes import initialize_routes

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'

api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost:27017/carret-authen'
}

initialize_db(app)
initialize_routes(api)

otp = random.randint(100000,999999)

dic={}

@app.route('/api/auth/email', methods=['POST'])
def email():
    body = request.get_json()
    receiver = body['emailId']
    message = Mail(
        from_email='singhsaurav8418@gmail.com',
        to_emails=receiver,
        subject='Carret - OTP for login validation',
        html_content='<strong>Your otp is: </strong>'+str(otp))
    try:
        sg = SendGridAPIClient('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')
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return {'Email':'sent' }, 200
    except Exception as e:
        print(e.message)
        return {'Error':'error'}, 400

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    body = request.get_json()
    if body['oTp'] == str(otp):
        del body['oTp']
        del body['agree']
        user = User(**body)
        user.hash_password()
        user.save()
        id = user.id
        return {'id': str(id)}, 200
    else:
        return{'Error':'Error in verification'}, 401




@app.route('/api/auth/login', methods=['POST'])
def login():
    body = request.get_json()
    if body['oTp'] == str(otp):
        del body['oTp']
        user = User.objects.get(emailId=body['emailId'])
        authorized = user.check_password(body['password'])
        if not authorized:
            return {'error': 'Email or password invalid'}, 401
        expires = datetime.timedelta(days=7)
        access_token = create_access_token(identity=str(user.id), expires_delta=expires)
        dic['token'] = str(access_token)
        json_object = json.dumps(dic, indent = 4)
        return {'token': str(access_token)}, 200
    else:
        return{'Error':'Error in verification'}, 400
    

@app.route('/api/auth/token')
def get_token():
    json_object = json.dumps(dic, indent = 4)
    return Response(json_object, mimetype="application/json", status=200) 

app.run()

