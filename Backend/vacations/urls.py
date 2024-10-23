
from .views import VacationResponseView, VacationView, VacationRequestListCreateView
from django.urls import path

urlpatterns = [
    path("vacationresponse/", VacationResponseView.as_view(), name="vacation-response"),
    path("confirmedvacations/", VacationView.as_view(), name="confirmed-vacations"),
     path('vacation-requests/', VacationRequestListCreateView.as_view(), name='vacation-request-list-create')

]