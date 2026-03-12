from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from config.firebase_config import db

class OpportunityListView(APIView):
    permission_classes = [AllowAny] # Anyone can view jobs

    def get(self, request):
        db_ref = db.collection('opportunities')
        
        # Simple fetching (no complex filters yet for MVP)
        docs = db_ref.stream()
        
        opportunities = []
        for doc in docs:
            opp = doc.to_dict()
            opp['id'] = doc.id
            opportunities.append(opp)
            
        return Response({
            "results": opportunities,
            "count": len(opportunities)
        })