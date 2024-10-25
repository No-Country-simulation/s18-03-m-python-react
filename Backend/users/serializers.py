from rest_framework import serializers
from django.db import transaction
from django.contrib.auth.hashers import make_password
from .models import Person, Employee, Country, Province, City, Bank, BankAccountType
from workgroups.models import Team, Role, Department
from utils.utils import get_id

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
    vacation_days = serializers.IntegerField(read_only=True)
    class Meta:
        model = Employee
        fields = ["pk", "start_date", "department", "team", "role", "salary", "working_day", "active_employee", "vacation_days"]
              
        
class PersonSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()
    
    class Meta:
        model = Person
        fields = ["pk", "dni", "phone_number", "birth", "profile_picture", "country", "province", "city", "address", "bank", "bank_account_type", "bank_account_number", "email", "first_name", "last_name", "employee"]
 
    def to_internal_value(self, data):
        city_value = data.get("city")
        if isinstance(city_value, str):
            data["city"] = get_id(City, "name", data["city"])
            
        province_value = data.get("province")
        if isinstance(province_value, str):
            data["province"] = get_id(Province, "name", data["province"])
            
        country_value = data.get("country")
        if isinstance(country_value, str):
            data["country"] = get_id(Country, "name", data["country"])
            
        team_value = data.get("value")
        if isinstance(team_value, str):
            data["team"] = get_id(Team, "title", data["team"])
           
        bank_value = data.get("bank")
        if isinstance(bank_value, str):
            data["bank"] = get_id(Bank, "name", data["bank"])
            
        bankaccounttype_value = data.get("bank_account_type")
        if isinstance(bankaccounttype_value, str):
            data["bank_account_type"] = get_id(BankAccountType, "name", data["bank_account_type"])
        
        employee_data = data.get("employee")
        if employee_data:
            role_value = employee_data.get("role")
            if isinstance(role_value, str):
                data["employee"]["role"] = get_id(Role, "title", data["employee"]["role"])
                
            department_value = employee_data.get("department")
            if isinstance(department_value, str):
                data["employee"]["department"] = get_id(Department, "title", data["employee"]["department"])
                
            team_list = employee_data.get("team", [])
            if not isinstance(team_list, list):
                team_list = [team_list]
            for i, team in enumerate(team_list):
                if isinstance(team, str):
                    team_list[i] = get_id(Team, "title", team)
                
        return super().to_internal_value(data)
          
 
    @transaction.atomic       
    def create(self, validated_data):
        if not validated_data.get('username'):
            validated_data['username'] = f"temp_user_{validated_data['email']}-{validated_data['dni']}" 
        if not validated_data.get('password'):
            validated_data['password'] = make_password("temporary_password")
        
        
        employee_data = validated_data.pop("employee") 
        
        employee_team = employee_data.pop("team", None)
         
        person = Person.objects.create(**validated_data)
        
        employee = Employee.objects.create(person=person, **employee_data)
        if employee_team:
            for team in employee_team:
                employee.team.add(team)
        
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
            for attr, value in employee_data.items():
                setattr(employee_instance, attr, value)
            if employee_team:
                employee_instance.team.clear()
                for team in employee_team:
                    employee_instance.team.add(team)
            employee_instance.save()
            
        return instance
    
    
    def to_representation(self, instance):
        try:
            employee = Employee.objects.get(person=instance)
            pk = employee.pk
            employee_data = {
                "start_date": employee.start_date if employee.start_date else None,
                "department": employee.department.title if employee.department else None,
                "team": [team.title for team in employee.team.all()] if employee.team.exists() else None,
                "role": employee.role.title if employee.role else None,
                "salary": employee.salary if employee.salary else None,
                "working_day": employee.working_day if employee.working_day else None,
                "vacation_days": employee.vacation_days if employee.vacation_days else None,
                "active_employee": employee.active_employee if employee.active_employee is not None else None
            }
        except Employee.DoesNotExist:
            return

        representation = {
            'pk': pk,
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


class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ["profile_picture"]