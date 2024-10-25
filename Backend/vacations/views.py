from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import VacationResponseSerializer, VacationAnsweredSerializer, VacationSerializer, VacationRequestSerializer
from .models import Vacation, VacationRequest
from users.models import Employee
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.
class VacationResponseView(APIView):
    @swagger_auto_schema(operation_description="Returns confirmed and denied vacation requests")
    def get(self, request, *args, **kwargs):
        vacations_answered_queryset = VacationRequest.objects.filter(status__in=["A","D"])
        
        vacations_answered_serialized = VacationAnsweredSerializer(vacations_answered_queryset, many=True)
        
        return Response(vacations_answered_serialized.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        operation_description="Accepts or Denies a vacation request.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'vacation': openapi.Schema(type=openapi.TYPE_INTEGER, description='Vacation request ID'),
                'status': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='If the request is accepted or denied'),
                'message': openapi.Schema(type=openapi.TYPE_STRING, description='Message sent to the employee'),
            },
            required=['vacation', 'status']
        ),
        responses={200: []}
    )
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
        
        employee = Employee.objects.get(id=vacation_request.employee.id)
        
        if accepted:
            vacation_request.status = "A"
            diff = vacation_request.end - vacation_request.start
            if diff.days > vacation_request.employee.vacation_days:
                return Response({"message": "Not enough vacation days"})
            vacation_obj = Vacation(employee=vacation_request.employee, start=vacation_request.start, end=vacation_request.end)
            vacation_obj.full_clean()
            vacation_obj.save()
            employee.vacation_days -= diff.days + 1
            employee.save()
            
        else:
            vacation_request.status = "D"
            
        vacation_request.full_clean()
        vacation_request.save()
        
        return Response(status=status.HTTP_200_OK)
    
    
class VacationView(APIView):
    @swagger_auto_schema(operation_description="Returns already accepted and confirmed vacations")
    def get(self, request, *args, **kwargs):
        vacations_queryset = Vacation.objects.all()
        
        vacations_serialized = VacationSerializer(vacations_queryset, many=True)
        
        return Response(vacations_serialized.data, status=status.HTTP_200_OK)
    
    
class VacationRequestListCreateView(generics.ListCreateAPIView):
    queryset = VacationRequest.objects.all()
    serializer_class = VacationRequestSerializer