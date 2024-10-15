from rest_framework import generics, viewsets
from .models import Country, Province, City, Bank, BankAccountType, Employee, Person
from .serializers import CountrySerializer, ProvinceSerializer, CitySerializer, BankSerializer, BankAccountTypeSerializer, EmployeeSerializer, PersonSerializer

# Create your views here.
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