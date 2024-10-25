from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from workgroups.models import Department, Role
from .models import Country, Province, City, Bank, BankAccountType, Employee, Person
from .serializers import CountrySerializer, ProvinceSerializer, CitySerializer, BankSerializer, BankAccountTypeSerializer, ProfilePictureSerializer, PersonSerializer

# Create your views here.
## General information apis
class EntitiesAmountView(APIView):
    def get(self, request):
        data = {
            "Country": Country.objects.count(),
            "Province": Province.objects.count(),
            "City": City.objects.count(),
            "Bank": Bank.objects.count(),
            "Bank_account_type": BankAccountType.objects.count(),
            "Department": Department.objects.count(),
            "Role": Role.objects.count(),
            "Employee": Employee.objects.count(),
        }
    
        return Response(data, status=status.HTTP_200_OK)

## Country apis
class CountryListCreateView(generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    

class CountryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

## Province apis

class ProvinceListCreateView(generics.ListCreateAPIView):
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer


class ProvinceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer
    
## City apis

class CityListCreateView(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class CityDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    
## Bank apis

class BankListCreateView(generics.ListCreateAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer


class BankDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer
    
## BankAccountType api

class BankAccountTypeListCreateView(generics.ListCreateAPIView):
    queryset = BankAccountType.objects.all()
    serializer_class = BankAccountTypeSerializer


class BankAccountTypeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BankAccountType.objects.all()
    serializer_class = BankAccountTypeSerializer

## Employee api

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    
    def get_object(self):
        
        employee =  Employee.objects.get(id=self.kwargs["pk"])
        self.kwargs["pk"] = employee.person.id
        
        return super().get_object()
    

class ProfilePictureView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request, pk):
        try:
            employee_obj = Employee.objects.get(pk=pk)
            obj = employee_obj.person
        except Employee.DoesNotExist:
            return Response({'error': 'Person not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfilePictureSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Image update correctly'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            
class ActiveEmployeeView(APIView):
    def post(self, request, pk):
        try:
            obj = Employee.objects.get(pk=pk)
        except (Employee.DoesNotExist):
            return Response({"message": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        
        obj.active_employee = not obj.active_employee
        
        obj.save()
        
        return Response({"message": f"Employee status set to {'active' if obj.active_employee else 'inactive'}"}, status=status.HTTP_200_OK)