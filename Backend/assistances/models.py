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
    
class AssistanceReport(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    note = models.CharField(max_length=500, null=True, blank=True)
    is_justified = models.BooleanField()
    date = models.DateField()