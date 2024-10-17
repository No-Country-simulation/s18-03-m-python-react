from json import load
from django.core.management.base import BaseCommand
from users.models import Bank, BankAccountType, Country, Province, City, Employee, Person
from workgroups.models import Department, Role

class Command(BaseCommand):
    help = 'Create an admin user'
    
    def load_data(self, Model, data):
        for item_data in data:
            _, created = Model.objects.get_or_create(**item_data)

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

            for employee_data in data:
                country = Country.objects.get(id=employee_data['country'])
                province = Province.objects.get(id=employee_data['province'])
                city = City.objects.get(id=employee_data['city'])
                bank = Bank.objects.get(id=employee_data['bank'])
                bank_account_type = BankAccountType.objects.get(id=employee_data['bank_account_type'])
                department = Department.objects.get(id=employee_data['employee']['department'])
                role = Role.objects.get(id=employee_data['employee']['role'])
                
                person = Person.objects.create(
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
                employee = Employee.objects.create(
                    person=person,
                    start_date=employee_data['employee']['start_date'],
                    department=department,
                    role=role,
                    salary=employee_data['employee']['salary'],
                    working_day=employee_data['employee']['working_day'],
                )
            
        self.stdout.write(self.style.SUCCESS("Example data created succesfully"))    