from .views import AssistanceReportView, StartAssistanceView, EndAssistanceView, JustifyAssistanceView
from django.urls import path

urlpatterns = [
    path("assistancereport/", AssistanceReportView.as_view(), name="assistance-report"),
    path("openassistance/", StartAssistanceView.as_view(), name="open-assistance"),
    path("endassistance/", EndAssistanceView.as_view(), name="end-assistance"),
    path("justifyassistance/", JustifyAssistanceView.as_view(), name="justift-assistance")
]