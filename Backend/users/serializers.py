from rest_framework import serializers
from django.db import transaction
from django.contrib.auth.hashers import make_password
from .models import Person, Employee, Country, Province, City, Bank, BankAccountType
from workgroups.models import Team, Role

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["pk", "name"]
        

class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = ["pk", "name"]
        

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["pk", "name"]
        

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ["pk", "name"]
        

class BankAccountTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccountType
        fields = ["pk", "name"]
 

    
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ["pk", "start_date", "department", "team", "role", "salary", "working_day"]
              
        
class PersonSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()
    
    class Meta:
        model = Person
        fields = ["pk", "dni", "phone_number", "birth", "profile_picture", "country", "province", "city", "address", "bank", "bank_account_type", "bank_account_number", "email", "first_name", "last_name", "employee"]
 
    @transaction.atomic       
    def create(self, validated_data):
        if not validated_data.get('username'):
            validated_data['username'] = f"temp_user_{validated_data['email']}-{validated_data['dni']}" 
        if not validated_data.get('password'):
            validated_data['password'] = make_password("temporary_password")
        
        
        employee_data = validated_data.pop("employee") 
        
        employee_team = employee_data.pop("team")
        employee_role = employee_data.pop("role")
         
        person = Person.objects.create(**validated_data)
        
        employee = Employee.objects.create(person=person, **employee_data)
        
        for team in employee_team:
            employee.team.add(team)
        for role in employee_role:
            employee.role.add(role)
        
        return person
    
    
    @transaction.atomic
    def update(self, instance, validated_data):
        employee_data = validated_data.pop("employee", None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if employee_data:
            try:
                employee_instance = Employee.objects.get(person=instance)
            except Employee.DoesNotExist:
                raise serializers.ValidationError({"employee": "Employee not found for this person"})
            employee_team = employee_data.pop("team", None)
            employee_role = employee_data.pop("role", None)
            for attr, value in employee_data.items():
                setattr(employee_instance, attr, value)
            if employee_team:
                employee_instance.team.clear()
                for team in employee_team:
                    employee_instance.team.add(team)
            if employee_role:
                employee_instance.role.clear()
                for role in employee_role:
                    employee_instance.role.add(role)
            employee_instance.save()
            
        return instance
    
    
    def to_representation(self, instance):
        try:
            employee = Employee.objects.get(person=instance)
            employee_data = {
                "start_date": employee.start_date if employee.start_date else None,
                "department": employee.department.title if employee.department else None,
                "team": [team.title for team in employee.team.all()] if employee.team.exists() else None,
                "role": [role.title for role in employee.role.all()] if employee.role.exists() else None,
                "salary": employee.salary if employee.salary else None,
                "working_day": employee.working_day if employee.working_day else None,
            }
        except Employee.DoesNotExist:
            employee_data = None

        representation = {
            'pk': instance.pk if instance.pk else None,
            'dni': instance.dni if instance.dni else None,
            'phone_number': instance.phone_number if instance.phone_number else None,
            'birth': instance.birth if instance.birth else None,
            'profile_picture': instance.profile_picture.url if instance.profile_picture else None,
            'country': instance.country.name if instance.country else None,
            'province': instance.province.name if instance.province else None,
            'city': instance.city.name if instance.city else None,
            'address': instance.address if instance.address else None,
            'bank': instance.bank.name if instance.bank else None,
            'bank_account_type': instance.bank_account_type.name if instance.bank_account_type else None,
            'bank_account_number': instance.bank_account_number if instance.bank_account_number else None,
            'email': instance.email if instance.email else None,
            'first_name': instance.first_name if instance.first_name else None,
            'last_name': instance.last_name if instance.last_name else None,
            "employee": employee_data
        }

        return representation
