from django.db import models
from django.contrib.auth.models import AbstractUser
from workgroups.models import Role, Department, Team
# Create your models here.
class Country(models.Model):
    name = models.TextField(max_length=50)
    
class Province(models.Model):
    name = models.TextField(max_length=50)

class City(models.Model):
    name = models.TextField(max_length=50)
    
class Bank(models.Model):
    name = models.TextField(max_length=50)
    
class BankAccountType(models.Model):
    name = models.TextField(max_length=50)

class Person(AbstractUser):
    dni = models.PositiveIntegerField(null=True, blank=True)
    phone_number = models.TextField(max_length=20, null=True, blank=True)
    birth = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to="profile_pictures/", null=True, blank=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, blank=True) 
    province = models.ForeignKey(Province, on_delete=models.SET_NULL, null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.TextField(max_length=100, null=True, blank=True)
    bank = models.ForeignKey(Bank, on_delete=models.SET_NULL, null=True, blank=True)
    bank_account_type = models.ForeignKey(BankAccountType, on_delete=models.SET_NULL, null=True, blank=True)
    bank_account_number = models.PositiveIntegerField(null=True, blank=True)

class Employee(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    start_date = models.DateField(null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    team = models.ManyToManyField(Team)
    role = models.ManyToManyField(Role)
    salary = models.PositiveSmallIntegerField(null=True, blank=True)
    working_day = models.TextField(max_length=200, null=True, blank=True)