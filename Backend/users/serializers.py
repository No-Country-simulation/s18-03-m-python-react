from rest_framework import serializers
from django.db import transaction
from django.contrib.auth.hashers import make_password
from .models import Person, Employee, Country, Province, City, Bank, BankAccountType

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["name"]
        

class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = ["name"]
        

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["name"]
        

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ["name"]
        

class BankAccountTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccountType
        fields = ["name"]
 

    
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ["start_date", "department", "team", "role", "salary", "working_day"]
              
        
class PersonSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()
    
    class Meta:
        model = Person
        fields = ["dni", "phone_number", "birth", "profile_picture", "country", "province", "city", "address", "bank", "bank_account_type", "bank_account_number", "email", "first_name", "last_name", "employee"]
 
    @transaction.atomic       
    def create(self, validated_data):
        if not validated_data.get('username'):
            validated_data['username'] = f"temp_user_{validated_data['email']}" 
        if not validated_data.get('password'):
            validated_data['password'] = make_password("temporary_password")
        
        
        employee_data = validated_data.pop("employee")
        
        person = Person.objects.create(**validated_data)
        
        Employee.objects.create(person=person, **employee_data)
    
        return person
    