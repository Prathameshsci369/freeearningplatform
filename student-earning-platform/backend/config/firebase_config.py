import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Construct the path to the service account key
# This looks for the file in the same directory as manage.py
key_path = os.path.join(os.path.dirname(__file__), '..', 'serviceAccountKey.json')

if not os.path.exists(key_path):
    raise FileNotFoundError(f"Service account key not found at {key_path}")

cred = credentials.Certificate(key_path)

# Initialize the app only if it hasn't been initialized yet
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()