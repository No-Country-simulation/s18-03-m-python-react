from .views import VacationResponseView
from django.urls import path

urlpatterns = [
    path("vacationresponse/", VacationResponseView.as_view(), name="vacation-response"),
]