import calendar
from datetime import datetime, date, timedelta
from django.db import models
from django.db.models.functions import TruncDate
from django.core.exceptions import ValidationError
from users.models import Employee

# Create your models here.
class Assistance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    entry = models.DateTimeField(default=datetime.now)
    exit = models.DateTimeField(null=True, blank=True)
        
    def clean(self):
        super().clean()
        if self.entry and self.exit:
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
            )
            
            total_worked_time = timedelta()
            
            for assistance in month_asistance:
                if assistance.exit:
                    worked_time = assistance.exit - assistance.entry
                    total_worked_time += worked_time
            
            days_with_assistance = [assistance.entry.day for assistance in month_asistance]
            
            days_without_assistance = [
                day for day in work_days
                if day not in days_with_assistance
            ]
            
            dates_without_assistance = [
                date(today.year, today.month, day) for day in days_without_assistance
            ]
            
            employee = Employee.objects.get(id=id)
            
            data[id] = {
                "inassistances": dates_without_assistance,
                "hours_worked": total_worked_time.total_seconds() // 3600,
                "days_worked": len(month_asistance),
                "employee_id": id,
                "first_name": employee.person.first_name,
                "last_name": employee.person.last_name,
                "role": employee.role.title,
                "profile_picture": employee.person.profile_picture.url,
                } 
        
        return data
    
    
    @classmethod
    def get_assistance(cls, employee_id):
        today = date.today()
        assistance = cls.objects.get(employee=employee_id, entry__date=today, exit=None)
        return assistance
        
