from django.contrib import admin
from .models import Vacation, VacationRequest, VacationDeniedLog

# Register your models here.
admin.site.register(Vacation)
admin.site.register(VacationRequest)
admin.site.register(VacationDeniedLog)