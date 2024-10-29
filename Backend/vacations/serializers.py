from rest_framework import serializers
from .models import VacationRequest, Vacation
from users.models import Employee
from django.core.exceptions import ValidationError

class VacationRequestSerializer(serializers.ModelSerializer):
    message = serializers.CharField(read_only=True)
    status = serializers.CharField(read_only=True)
    pk = serializers.IntegerField(read_only=True)

    class Meta:
        model = VacationRequest
        fields = ['pk', 'employee', 'start', 'end', 'status', 'message'] 

    def create(self, validated_data):
        vacation_request = VacationRequest(**validated_data)
        try:
            vacation_request.full_clean() 
            vacation_request.save()
        except ValidationError as e:
            raise serializers.ValidationError({"detail": e.messages})
        return vacation_request
    
    def to_representation(self, instance):
        data = {
            "pk": instance.pk,
            "start": instance.start,
            "end": instance.end,
            "status": instance.status,
            "message": instance.message,
            "employee": {
                "pk": instance.employee.pk,
                "first_name": instance.employee.person.first_name if instance.employee.person.first_name else None,
                "last_name": instance.employee.person.last_name if instance.employee.person.last_name else None,
                "role": instance.employee.role.title if instance.employee.role.title else None,
                "profile_picture": instance.employee.person.profile_picture.url if instance.employee.person.profile_picture else None,
                "vacation_days": instance.employee.vacation_days if instance.employee.vacation_days else None
            }
        }
        return data
    
    
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
        
    