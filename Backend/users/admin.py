from django.contrib import admin
from .models import Employee, Country, Province, City, Bank, BankAccountType, Person

# Register your models here.
admin.site.register(Country)
admin.site.register(Province)
admin.site.register(City)
admin.site.register(Bank)
admin.site.register(BankAccountType)
admin.site.register(Person)
admin.site.register(Employee)