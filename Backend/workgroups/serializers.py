from rest_framework import serializers
from .models import Department, Role, Team


class DepartmentSerializer(serializers.ModelSerializer):
    class meta:
        model = Department
        fields = ["title"]
        

class RoleSerializer(serializers.ModelSerializer):
    class meta:
        model = Role
        fields = ["title"]
        
        

class TeamSerializer(serializers.ModelSerializer):
    class meta:
        model = Team
        fields = ["title"]