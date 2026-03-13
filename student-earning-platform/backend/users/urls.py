from django.urls import path
from .views import SaveOpportunityView, SavedOpportunitiesListView, EarningsListView

urlpatterns = [
    # URL for listing saved jobs
    path('saved/', SavedOpportunitiesListView.as_view(), name='saved-list'),
    
    # URL for saving/un-saving a specific job
    path('save/<str:opportunity_id>/', SaveOpportunityView.as_view(), name='save-opportunity'),
    
    # URL for earnings
    path('earnings/', EarningsListView.as_view(), name='earnings'),
]