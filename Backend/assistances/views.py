from datetime import date, datetime
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
    
    
class JustifyAssistanceView(APIView):
    def post(self, request, *args, **kwargs):
        if not (employee_id := request.data.get('employee_id', None)):
            return Response({'message': 'Employee id required'}, status=status.HTTP_400_BAD_REQUEST)
        if not (employee := Employee.objects.filter(id=employee_id).first()):
            return Response({'message': f'Employee with id {employee_id} not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not (date_parameter := request.data.get('date', None)):
            return Response({'message': 'Date is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            date.fromisoformat(date_parameter)
        except ValueError:
            return Response({'message': 'Invalid date format'})
         
        if Assistance.objects.filter(employee=employee_id, entry__date=date_parameter).exists():
            return Response({'message': 'Assistance already exist in that date'})
        
        date_parameter_formated_to_entry = datetime.strptime((date_parameter + ' 08:00'), "%Y-%m-%d %H:%M")
        date_parameter_formated_to_exit = datetime.strptime((date_parameter + ' 16:00'), "%Y-%m-%d %H:%M")
       
       
        assistance_obj = Assistance(employee=employee, entry=date_parameter_formated_to_entry, exit=date_parameter_formated_to_exit)
        try:
            assistance_obj.full_clean()
        except ValidationError as e:
            return Response({'message': f'Validation error: {e}'}, status=status.HTTP_400_BAD_REQUEST)
        assistance_obj.save()
        
        return Response(status=status.HTTP_204_NO_CONTENT)