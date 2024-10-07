import os
from django.core.management.base import BaseCommand
from users.models import Person

class Command(BaseCommand):
    help = 'Create an admin user'

    def handle(self, *args, **kwargs):
        if not Person.objects.filter(username=os.environ.get('ADMIN_USER')).exists():
            user = Person.objects.create_superuser(
                username=os.environ.get('ADMIN_USER'),
                email=os.environ.get('ADMIN_EMAIL'),
                password = os.environ.get('ADMIN_PASSWORD')
            )
            user.save()
            
            self.stdout.write(self.style.SUCCESS('Successfully created admin user'))
        else:
            self.stdout.write(self.style.WARNING('Admin user already exists'))