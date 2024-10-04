from django.db import models
from django.contrib.auth.models import AbstractUser
from workgroups.models import Role, Department, Team

# Create your models here.
class Employee(models.Model):
    person = models.ForeignKey(AbstractUser, on_delete=models.CASCADE)
    start_date = models.DateField(null=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL)
    team = models.ManyToManyField(Team)
    role = models.ManyToManyField(Role)