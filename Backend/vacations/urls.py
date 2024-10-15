from django.urls import path
from .views import VacationRequestListCreateView

urlpatterns = [
    path('vacation-requests/', VacationRequestListCreateView.as_view(), name='vacation-request-list-create'), 
]