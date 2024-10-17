from json import load
from django.core.management.base import BaseCommand
from users.models import Bank, BankAccountType, Country, Province, City
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
            
        self.stdout.write(self.style.SUCCESS("Example data created succesfully"))    