import jwt
from rest_framework import authentication, exceptions
from django.conf import settings
from .firestore import user_db

JWT_SECRET = 'your_super_secret_key_here_123' 
JWT_ALGORITHM = 'HS256'

# 1. Create a simple wrapper class to mimic Django User
class FirebaseUser:
    def __init__(self, user_dict):
        self.user_dict = user_dict
        # Pass dictionary keys as attributes (e.g., user.id, user.email)
        for key, value in user_dict.items():
            setattr(self, key, value)

    @property
    def is_authenticated(self):
        # This is what Django checks for permission
        return True

class CustomJWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return None 

        try:
            prefix, token = auth_header.split(' ')
            if prefix.lower() != 'bearer':
                raise exceptions.AuthenticationFailed('Invalid token prefix.')
        except ValueError:
            raise exceptions.AuthenticationFailed('Invalid authorization header.')

        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired.')
        except jwt.DecodeError:
            raise exceptions.AuthenticationFailed('Invalid token.')

        user_id = payload.get('user_id')
        user = user_db.get_user_by_id(user_id)

        if user is None:
            raise exceptions.AuthenticationFailed('User not found.')

        # 2. Return the WRAPPED user, not the raw dictionary
        return (FirebaseUser(user), token)