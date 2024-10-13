from rest_framework import serializers
from .models import VacationRequest

class VacationRequestSerializer(serializers.ModelSerializer):
    message = serializers.CharField(read_only=True)

    class Meta:
        model = VacationRequest
        fields = ['start_date', 'end_date', 'message']

    def create(self, validated_data):
        request = self.context.get('request')  # Request para acceder al usuario que realiza la petición
        validated_data['employee'] = request.user  #El usuario es el empleado
        return super().create(validated_data)    # Crear la instancia de VacationRequest
        