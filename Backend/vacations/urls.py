from .views import VacationResponseView, VacationView
from django.urls import path

urlpatterns = [
    path("vacationresponse/", VacationResponseView.as_view(), name="vacation-response"),
    path("confirmedvacations/", VacationView.as_view(), name="confirmed-vacations")
]