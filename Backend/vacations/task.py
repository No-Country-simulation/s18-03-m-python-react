from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from vacations.models import VacationDeniedLog

def recurrent_task():
    vacation_denied_qset = VacationDeniedLog.objects.filter(log_date__lt=(datetime.today() - timedelta(days=7)))
    for vacation_denied in vacation_denied_qset:
        vacation_denied.vacation_request.delete()

def start_scheduler():
    print("Scheduler started")
    scheduler = BackgroundScheduler()
    scheduler.add_job(recurrent_task, 'interval', days=7) 
    scheduler.start()
