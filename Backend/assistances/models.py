from datetime import datetime
from django.db import models
from django.core.exceptions import ValidationError
from users.models import Employee

# Create your models here.
class Assistance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    entry = models.DateTimeField(auto_now_add=True)
    exit = models.DateTimeField(null=True, blank=True)
        
    def clean(self):
        super().clean()
        if self.entry > self.exit:
            raise ValidationError({
                'exit': "Exit time must be after entry time."
            })
            
    @classmethod
    def open_asistance(cls, employee_id):
        today = datetime.today()
        return cls.objects.filter(employee=employee_id, exit=None, entry__year=today.year, entry__month=today.month, entry__day=today.day).exists()
    
class AssistanceReport(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    note = models.CharField(max_length=500, null=True, blank=True)
    is_justified = models.BooleanField()
    date = models.DateField()