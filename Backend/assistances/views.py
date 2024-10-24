from datetime import datetime
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from .serializer import AssistanceSerializer
from .models import Assistance

# Create your views here.
class AssistanceView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = AssistanceSerializer(data=request.data)
        
        