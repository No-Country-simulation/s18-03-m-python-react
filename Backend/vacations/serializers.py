from rest_framework import serializers
from .models import VacationRequest

class VacationRequestSerializer(serializers.ModelSerializer):
    message = serializers.CharField(read_only=True)
    status = serializers.CharField(read_only=True)

    class Meta:
        model = VacationRequest
        fields = ['employee', 'start', 'end', 'status', 'message'] 

    def create(self, validated_data):
        validated_data['employee'] = None  # For when you decide to implement user management and authentication in the future.
        vacation_request = VacationRequest.objects.create(**validated_data)
        return vacation_request