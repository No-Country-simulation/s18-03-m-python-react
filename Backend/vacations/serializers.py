from rest_framework import serializers
from .models import VacationRequest

class VacationRequestSerializer(serializers.ModelSerializer):
    message = serializers.CharField(read_only=True)

    class Meta:
        model = VacationRequest
        fields = ['start', 'end', 'status', 'message'] 

    def create(self, validated_data):
        validated_data['employee'] = None  # Cuando se decida implementar la gestión de usuarios y autenticación en el futuro.
        vacation_request = VacationRequest.objects.create(**validated_data)
        return vacation_request

    def update(self, instance, validated_data):
        instance.start = validated_data.get('start', instance.start)
        instance.end = validated_data.get('end', instance.end)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance