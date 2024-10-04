from django.db import models

# Create your models here.

class Department(models.Model):
    title = models.CharField(max_length=50)
    

class Team(models.Model):
    title = models.CharField(max_length=50)
    
    
class Role(models.Model):
    title = models.CharField(max_length=50)