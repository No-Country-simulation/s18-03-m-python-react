from datetime import datetime
from django.utils import timezone
from django.shortcuts import render
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from users.models import Employee
from .models import Assistance

# Create your views here.
class AssistanceReportView(APIView):
    def get(self, request, *args, **kwargs):
        report = Assistance.get_report()
        return Response({"message": report}, status=status.HTTP_200_OK)

class StartAssistanceView(APIView):
    def post(self, request, *args, **kwargs):
        if not (user_id := request.data.get("employee_id", None)):
            return Response({"message": "Employee id required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            employee = Employee.objects.get(id=user_id)
        except Employee.DoesNotExist:
            return Response({"message": f"Employee with id {user_id} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        assistance = Assistance(employee=employee)
        try:
            assistance.full_clean()
        except ValidationError as e:
            return Response({"message": f"Validation error: {e}"}, status=status.HTTP_400_BAD_REQUEST)
        
        assistance.save()
        
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
    
class EndAssistanceView(APIView):
    def post(self, request, *args, **kwargs):
        if not (user_id := request.data.get("employee_id", None)):
            return Response({"message": "Employee id required"}, status=status.HTTP_400_BAD_REQUEST)
        if not Employee.objects.filter(id=user_id).exists():
            return Response({"message": f"Employee with id {user_id} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            assistance = Assistance.get_assistance(user_id)
        except Assistance.DoesNotExist:
            return Response({"message": "Assistance log not created yet"}, status=status.HTTP_400_BAD_REQUEST)
        
        assistance.exit = timezone.now()
        try:
            assistance.full_clean()
        except ValidationError as e:
            return Response({"message": f"Validation error: {e}"}, status=status.HTTP_400_BAD_REQUEST)
        
        assistance.save()
        
        return Response(status=status.HTTP_204_NO_CONTENT)