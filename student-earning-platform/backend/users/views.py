from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from config.firebase_config import db
from authentication.authentication import CustomJWTAuthentication
from firebase_admin import firestore
from datetime import datetime

# ---------------------------------------------------------
# 1. Save / Unsave Opportunity
# ---------------------------------------------------------
class SaveOpportunityView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, opportunity_id):
        """Save an opportunity"""
        user_id = request.user.id
        user_ref = db.collection('users').document(user_id)
        
        user_ref.update({
            'saved_opportunities': firestore.ArrayUnion([opportunity_id])
        })
        return Response({"message": "Opportunity saved"})

    def delete(self, request, opportunity_id):
        """Un-save an opportunity"""
        user_id = request.user.id
        user_ref = db.collection('users').document(user_id)
        
        user_ref.update({
            'saved_opportunities': firestore.ArrayRemove([opportunity_id])
        })
        return Response({"message": "Opportunity removed"})

# ---------------------------------------------------------
# 2. List Saved Opportunities
# ---------------------------------------------------------
class SavedOpportunitiesListView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Get list of saved opportunities"""
        user_id = request.user.id
        user_ref = db.collection('users').document(user_id)
        user_doc = user_ref.get()
        
        if user_doc.exists:
            user_data = user_doc.to_dict()
            saved_ids = user_data.get('saved_opportunities', [])
            
            opportunities = []
            for opp_id in saved_ids:
                opp_doc = db.collection('opportunities').document(opp_id).get()
                if opp_doc.exists:
                    opp_data = opp_doc.to_dict()
                    opp_data['id'] = opp_doc.id
                    opportunities.append(opp_data)
            
            return Response({"results": opportunities})
        
        return Response({"results": []})

# ---------------------------------------------------------
# 3. Earnings Tracker
# ---------------------------------------------------------
class EarningsListView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Get total earnings"""
        user_id = request.user.id
        earnings_ref = db.collection('users').document(user_id).collection('earnings')
        docs = earnings_ref.stream()
        
        total = 0
        items = []
        for doc in docs:
            data = doc.to_dict()
            data['id'] = doc.id
            items.append(data)
            total += data.get('amount', 0)
            
        return Response({"total": total, "items": items})

    def post(self, request):
        """Add new earning"""
        user_id = request.user.id
        data = request.data
        
        amount = data.get('amount')
        if not amount:
            return Response({"error": "Amount required"}, status=400)
            
        earning_data = {
            'amount': float(amount),
            'source': data.get('source', 'Unknown'),
            'notes': data.get('notes', ''),
            'date_received': data.get('date_received', datetime.now().strftime('%Y-%m-%d'))
        }
        
        db.collection('users').document(user_id).collection('earnings').add(earning_data)
        return Response({"message": "Earning added"}, status=201)