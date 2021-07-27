from .db import db
import mongoengine_goodjson as gj
from datetime import datetime
from flask_bcrypt import generate_password_hash, check_password_hash   

class Profile(gj.Document):
    apiKey = db.StringField(required=True, unique=True)
    apiSecret = db.StringField(required=True, unique=True)
    exchangeName = db.StringField(required=True)
    createdAt = db.DateTimeField(default= datetime.now)
    deletedAt = db.DateTimeField(default= datetime.now)
    addedBy = db.ReferenceField('User')

class User(gj.Document):
    firstName = db.StringField()
    lastName = db.StringField()
    emailId = db.EmailField(required=True, unique=True)
    phoneNo = db.IntField(unique=True)
    password = db.StringField(required=True, min_length=6)
    referralId = db.StringField()


    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')
 
    def check_password(self, password):
        return check_password_hash(self.password, password)

User.register_delete_rule(Profile, 'added_by', db.CASCADE)
