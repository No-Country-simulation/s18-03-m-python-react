from rest_framework import serializers
from .models import VacationRequest, Vacation
from django.core.exceptions import ValidationError

class VacationRequestSerializer(serializers.ModelSerializer):
    message = serializers.CharField(read_only=True)
    status = serializers.CharField(read_only=True)

    class Meta:
        model = VacationRequest
        fields = ['employee', 'start', 'end', 'status', 'message'] 

    def create(self, validated_data):
        vacation_request = VacationRequest(**validated_data)
        try:
            vacation_request.clean()  
            vacation_request.save()
        except ValidationError as e:
            raise serializers.ValidationError({"detail": e.messages})
        return vacation_request
    
    
class VacationResponseSerializer(serializers.Serializer):
    vacation = serializers.IntegerField()
    status = serializers.BooleanField()
    message = serializers.CharField(max_length=500, required=False, allow_null=True)
    
    def validate_vacation(self, value):
        try:
            vacation_request = VacationRequest.objects.get(id=value)
        except VacationRequest.DoesNotExist:
            raise serializers.ValidationError("Vacation not found.")
        
        if vacation_request.status != "P":
            raise serializers.ValidationError(f"Vacation alredy {vacation_request.get_status_display()}")
        
        return value
    

class VacationAnsweredSerializer(serializers.ModelSerializer):
    class Meta:
        model = VacationRequest
        fields = ["employee", "start", "end", "status", "message"]
        
        
class VacationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacation
        fields = ["id", "start", "end", "employee"]