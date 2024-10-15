from rest_framework import generics
from .models import VacationRequest
from users.models import Employee
from .serializers import VacationRequestSerializer
from django.core.exceptions import ValidationError

class VacationRequestListCreateView(generics.ListCreateAPIView):
    queryset = VacationRequest.objects.all()
    serializer_class = VacationRequestSerializer

    def perform_create(self, serializer):
        employee_id = self.request.data.get('employee_id')  # The employee is obtained from the body of the HTTP request
        if not employee_id:
            raise ValidationError({"employee": "Employee must be provided in the context."})

        try:
            employee = Employee.objects.get(id=employee_id)  # to make sure the employee is in the database.
        except Employee.DoesNotExist:
            raise ValidationError({"employee": "Employee does not exist."})

        serializer.save(employee=employee)

