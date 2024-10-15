from rest_framework import serializers
from .models import Department, Role, Team


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["pk", "title"]
        

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["pk", "title"]
        
        

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ["pk", "title"]