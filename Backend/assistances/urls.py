from .views import AssistanceReportView
from django.urls import path

urlpatterns = [
    path("assistancereport/", AssistanceReportView.as_view(), name="assistance-report"),
]