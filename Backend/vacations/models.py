from datetime import date
from django.db import models
from users.models import Employee
from django.core.exceptions import ValidationError

# Create your models here.
class VacationDatesValidation():
    def custom_clean(self):
        if self.start > self.end:
            raise ValidationError({
                "end": "End date must be after start date"
            })
            
        if self.start < date.today():
            raise ValidationError({
                "start": "Start cannot be in the past"
            })


class Vacation(models.Model, VacationDatesValidation):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    start = models.DateField()
    end = models.DateField()
    
    def clean(self):
        self.custom_clean()
        super().clean()
    
class VacationRequest(models.Model, VacationDatesValidation):
    status = models.CharField(choices=[("A", "Accepted"),("D", "Denied"),("P", "Pending")], default="P", max_length=1)
    message = models.CharField(max_length=500, null=True, blank=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    start = models.DateField()
    end = models.DateField()
   
    def clean(self):
        self.custom_clean()
        
        diff = self.end - self.start
        if diff.days + 1> self.employee.vacation_days:
            raise ValidationError({
                "end": "Not enough vacation days"
            })
        
        super().clean()
    