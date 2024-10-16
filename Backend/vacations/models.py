from datetime import date
from django.db import models
from users.models import Employee
from django.core.exceptions import ValidationError

# Create your models here.
class Vacation(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, null=True)
    start = models.DateField()
    end = models.DateField()
    
    def clean(self):
        super().clean()
        if self.start > self.end:
            raise ValidationError({
                'end': "End date must be after start date."
            })
    
    
class VacationRequest(Vacation):
    status = models.CharField(choices=[("A", "Accepted"),("D", "Denied"),("P", "Pending")], default="P", max_length=1)
    message = models.CharField(max_length=500, null=True)