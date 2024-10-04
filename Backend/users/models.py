from django.db import models
from django.contrib.auth.models import User
from workgroups.models import Role, Department, Team

# Create your models here.
class Employee(models.Model):
    person = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateField(null=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    team = models.ManyToManyField(Team)
    role = models.ManyToManyField(Role)