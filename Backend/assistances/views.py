from datetime import datetime
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Assistance

# Create your views here.
class AssistanceReportView(APIView):
    def get(self, request, *args, **kwargs):
        report = Assistance.get_report()
        return Response({"message": report}, status=status.HTTP_200_OK)
