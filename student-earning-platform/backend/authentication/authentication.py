import jwt
from rest_framework import authentication, exceptions
from django.conf import settings
from .firestore import user_db

# Must match the secret used in views.py
JWT_SECRET = 'your_super_secret_key_here_123' 
JWT_ALGORITHM = 'HS256'

class CustomJWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        # 1. Get the Authorization header
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return None # No auth header, let request proceed (or deny if view requires auth)

        # 2. Check format: "Bearer <token>"
        try:
            prefix, token = auth_header.split(' ')
            if prefix.lower() != 'bearer':
                raise exceptions.AuthenticationFailed('Invalid token prefix.')
        except ValueError:
            raise exceptions.AuthenticationFailed('Invalid authorization header.')

        # 3. Decode Token
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired.')
        except jwt.DecodeError:
            raise exceptions.AuthenticationFailed('Invalid token.')

        # 4. Get User from Firebase
        user_id = payload.get('user_id')
        user = user_db.get_user_by_id(user_id) # We need to add this method to firestore.py

        if user is None:
            raise exceptions.AuthenticationFailed('User not found.')

        # Return (user, token) - Django uses this for request.user
        return (user, token)