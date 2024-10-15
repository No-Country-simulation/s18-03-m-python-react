from django.contrib import admin
from .models import Department, Team, Role

# Register your models here.
admin.site.register(Department)
admin.site.register(Team)
admin.site.register(Role)