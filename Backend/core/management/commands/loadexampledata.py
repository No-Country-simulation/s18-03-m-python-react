import os
from django.core.management.base import BaseCommand
from users.models import Person

class Command(BaseCommand):
    help = 'Create an admin user'

    def handle(self, *args, **kwargs):
        pass