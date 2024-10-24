import calendar
from datetime import datetime, date
from django.db import models
from django.db.models.functions import TruncDate
from django.core.exceptions import ValidationError
from users.models import Employee

# Create your models here.
class Assistance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    entry = models.DateTimeField()
    exit = models.DateTimeField(null=True, blank=True)
        
    def clean(self):
        super().clean()
        if self.entry > self.exit:
            raise ValidationError({
                'exit': "Exit time must be after entry time."
            })
            

    @classmethod
    def get_report(cls, month: int=None, employee_id: int=None):
        today = datetime.now()
        if month is None:
            month = today.month
        if not 1 <= month <= 12:
            raise ValueError
        
        cal = calendar.Calendar()
        work_days = [
            day[0] for day in cal.itermonthdays2(today.year, today.month)
            if day[0] != 0 and day[1] < 5  and day[0] <= today.day
        ]
        
        if employee_id is None:
            employees_ids = Employee.objects.values_list("pk", flat=True)
        else:
            employees_ids = [employee_id]
        
        data = {}
        
        for id in employees_ids:
            month_asistance = Assistance.objects.filter(
                employee = id,
                entry__year=today.year,
                entry__month=today.month
            ).annotate(date=TruncDate('entry')).values_list('date', flat=True)
            
            days_with_assistance = [assistance.day for assistance in month_asistance]
            
            days_without_assistance = [
                day for day in work_days
                if day not in days_with_assistance
            ]
            
            dates_without_assistance = [
                date(today.year, today.month, day) for day in days_without_assistance
            ]
            
            data[id] =  dates_without_assistance
        
        return data
