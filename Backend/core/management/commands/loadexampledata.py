from datetime import datetime
from json import load
from django.db import IntegrityError
from django.utils import timezone
from django.core.management.base import BaseCommand
from users.models import Bank, BankAccountType, Country, Province, City, Employee, Person
from workgroups.models import Department, Role
from vacations.models import VacationRequest, Vacation
from assistances.models import Assistance


class Command(BaseCommand):
    help = 'Create an admin user'
    
    def load_data(self, Model, data):
        for item_data in data:
            _, created = Model.objects.get_or_create(**item_data)
            
    def get_working_days_current_month(self):
        today = datetime.now()
        current_year = today.year
        current_month = today.month
        current_day = today.day
        
        working_days = []
        
        for day in range(1, current_day+ 1):
            date = datetime(current_year, current_month, day)
            
            if date.weekday() < 5:
                working_days.append(date)
    
        return working_days

    def handle(self, *args, **kwargs):
        data_dir = "core/exampledata/"
        with open((data_dir + "bank.json"), "r") as file:
            data = load(file)
            created = self.load_data(Bank, data)
            if created:
                return
            
        with open((data_dir + "bankaccounttype.json"), "r") as file:
            data = load(file)
            created = self.load_data(BankAccountType, data)
            if created:
                return
            
        with open((data_dir + "city.json"), "r") as file:
            data = load(file)
            created = self.load_data(City, data)
            if created:
                return
            
        with open((data_dir + "country.json"), "r") as file:
            data = load(file)
            created = self.load_data(Country, data)
            if created:
                return
            
        with open((data_dir + "department.json"), "r") as file:
            data = load(file)
            created = self.load_data(Department, data)
            if created:
                return
            
        with open((data_dir + "province.json"), "r") as file:
            data = load(file)
            created = self.load_data(Province, data)
            if created:
                return
            
        with open((data_dir + "role.json"), "r") as file:
            data = load(file)
            created = self.load_data(Role, data)
            if created:
                return
            
        with open((data_dir + "employees.json"), "r") as file:
            data = load(file)
            employees = []

            for employee_data in data:
                try:
                    country = Country.objects.get(id=employee_data['country'])
                    province = Province.objects.get(id=employee_data['province'])
                    city = City.objects.get(id=employee_data['city'])
                    bank = Bank.objects.get(id=employee_data['bank'])
                    bank_account_type = BankAccountType.objects.get(id=employee_data['bank_account_type'])
                    department = Department.objects.get(id=employee_data['employee']['department'])
                    role = Role.objects.get(id=employee_data['employee']['role'])
                    
                    person, _ = Person.objects.get_or_create(
                        dni=employee_data['dni'],
                        phone_number=employee_data['phone_number'],
                        birth=employee_data['birth'],
                        profile_picture=employee_data['profile_picture'],
                        country=country,
                        province=province,
                        city=city,
                        address=employee_data['address'],
                        bank=bank,
                        bank_account_type=bank_account_type,
                        bank_account_number=employee_data['bank_account_number'],
                        email=employee_data['email'],
                        first_name=employee_data['first_name'],
                        last_name=employee_data['last_name'],
                        username=employee_data["email"]
                    )
                    
                    # Crear la instancia del empleado
                    employee, _ = Employee.objects.get_or_create(
                        person=person,
                        start_date=employee_data['employee']['start_date'],
                        department=department,
                        role=role,
                        salary=employee_data['employee']['salary'],
                        working_day=employee_data['employee']['working_day'],
                    )
                    
                    employees.append(employee)
                except IntegrityError:
                    pass
                
        with open((data_dir + "vacationrequests.json"), "r") as file:
            data = load(file)
            
            for vacationrequest in data:
                vacationrequest["employee"] = Employee.objects.get(id=vacationrequest["employee"])
                
                created = self.load_data(VacationRequest, [vacationrequest])
                if created:
                    return
            
        with open((data_dir + "vacation.json"), "r") as file:
            data = load(file)
            
            for vacation in data:
                vacation["employee"] = Employee.objects.get(id=vacation["employee"])
               
                created = self.load_data(Vacation, [vacation])
                if created:
                    return
                
        
        working_days = self.get_working_days_current_month()
        for employee in employees:
            for i, day in enumerate(working_days):
                if i % employee.id != 0:
                    _, created = Assistance.objects.get_or_create(employee=employee, entry=timezone.make_aware(day.replace(hour=8, minute=0)), exit=timezone.make_aware(day.replace(hour=16, minute=0)))
                    if not created:
                        return
        
                
            
        self.stdout.write(self.style.SUCCESS("Example data created succesfully"))    