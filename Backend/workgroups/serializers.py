from rest_framework import serializers
from .models import Department, Role, Team


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["title"]
        

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["title"]
        
        

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ["title"]