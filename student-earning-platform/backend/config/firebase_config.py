import os
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# 1. Check if running on Cloud (Render/Vercel) via Environment Variable
firebase_creds = os.environ.get('FIREBASE_CREDENTIALS')

if firebase_creds:
    # If on Cloud, parse the JSON string from Env Var
    cred_dict = json.loads(firebase_creds)
    cred = credentials.Certificate(cred_dict)
else:
    # If Local, load from the file
    key_path = os.path.join(os.path.dirname(__file__), '..', 'serviceAccountKey.json')
    if not os.path.exists(key_path):
        raise FileNotFoundError(f"Service account key not found at {key_path}")
    cred = credentials.Certificate(key_path)

# Initialize Firebase
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()