from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import VacationResponseSerializer, VacationAnsweredSerializer, VacationSerializer
from .models import Vacation, VacationRequest

# Create your views here.
class VacationResponseView(APIView):
    def get(self, request, *args, **kwargs):
        vacations_answered_queryset = VacationRequest.objects.filter(status__in=["A","D"])
        
        vacations_answered_serialized = VacationAnsweredSerializer(vacations_answered_queryset, many=True)
        
        return Response(vacations_answered_serialized.data, status=status.HTTP_200_OK)
    
    
    def post(self, request, *args, **kwargs):
        data = request.data
        
        serializer = VacationResponseSerializer(data=data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        validated_data = serializer.validated_data
        
        vacation_request = VacationRequest.objects.get(id=validated_data["vacation"])
        
        message = validated_data.get("message", None)
        accepted = validated_data["status"]
        
        if message:
            vacation_request.message = validated_data["message"]
        
        if accepted:
            vacation_request.status = "A"
            vacation_obj = Vacation(employee=vacation_request.employee, start=vacation_request.start, end=vacation_request.end)
            vacation_obj.full_clean()
            vacation_obj.save()
        else:
            vacation_request.status = "D"
            
        vacation_request.full_clean()
        vacation_request.save()
        
        return Response(status=status.HTTP_200_OK)
    
    
class VacationView(APIView):
    def get(self, request, *args, **kwargs):
        vacations_queryset = Vacation.objects.all()
        
        vacations_serialized = VacationSerializer(vacations_queryset, many=True)
        
        return Response(vacations_serialized.data, status=status.HTTP_200_OK)