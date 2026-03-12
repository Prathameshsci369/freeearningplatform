import bcrypt
from config.firebase_config import db
from firebase_admin import firestore
class FirestoreUserManager:
    def __init__(self):
        self.collection = db.collection('users')

    def create_user(self, email, password, name):
        # Check if user exists
        if self.get_user_by_email(email):
            return None # User already exists

        # Hash password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        user_data = {
            'email': email,
            'password_hash': hashed_password,
            'name': name,
            'skills': [],
            'created_at': firestore.SERVER_TIMESTAMP
        }
        
        # Add to Firestore
        doc_ref = self.collection.document()
        doc_ref.set(user_data)
        user_data['id'] = doc_ref.id
        return user_data

    def get_user_by_email(self, email):
        users = self.collection.where('email', '==', email).limit(1).get()
        if users:
            user_doc = users[0]
            user_dict = user_doc.to_dict()
            user_dict['id'] = user_doc.id
            return user_dict
        return None

    def verify_password(self, plain_password, hashed_password):
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

    def get_user_by_id(self, user_id):
        if not user_id:
            return None
        doc_ref = self.collection.document(user_id)
        doc = doc_ref.get()
        if doc.exists:
            user_dict = doc.to_dict()
            user_dict['id'] = doc.id
            return user_dict
        return None


# Singleton instance
user_db = FirestoreUserManager()