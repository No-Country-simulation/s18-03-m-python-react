from django.db import models

# Create your models here.

class Department(models.Model):
    title = models.CharField(max_length=50)
    
    def __str__(self):
        return self.title
    

class Team(models.Model):
    title = models.CharField(max_length=50)
    
    def __str__(self):
        return self.title
    
    
class Role(models.Model):
    title = models.CharField(max_length=50)
    
    def __str__(self):
        return self.title