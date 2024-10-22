from django.apps import AppConfig


class VacationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'vacations'

    def ready(self):
        from . import task
        task.start_scheduler()