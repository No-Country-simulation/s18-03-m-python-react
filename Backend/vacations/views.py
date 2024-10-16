from rest_framework import generics
from .models import VacationRequest
from .serializers import VacationRequestSerializer
from rest_framework.permissions import AllowAny

class VacationRequestListCreateView(generics.ListCreateAPIView):
    queryset = VacationRequest.objects.all()
    serializer_class = VacationRequestSerializer
    permission_classes = [AllowAny]  # Allows access without authentication
    