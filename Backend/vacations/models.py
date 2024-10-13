from datetime import date
from django.db import models
from users.models import Employee
from django.core.exceptions import ValidationError

# Create your models here.
class Vacation(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    start = models.DateField()
    end = models.DateField()
    
    def clean(self):
        super().clean()
        if self.start > self.end:
            raise ValidationError({
                'end': "End date must be after start date."
            })
    
    
class VacationRequest(Vacation):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    status = models.CharField(max_length=1, choices=[("Accepted", "A"),("Denied", "D"),("Pending", "P")], default="P")
    message = models.CharField(max_length=500, null=True)
    start_date = models.DateField()
    end_date = models.DateField()

    def clean(self):
        super().clean()
        if self.start_date > self.end_date:
            raise ValidationError({
                'end_date': "End date must be after start date."
            })