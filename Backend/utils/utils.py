from django.db import models
from datetime import date

def get_id(Model : models.Model, field: str, value: str) -> int:
    """Creates a new objects if it doesn't exists, or retrieve the id of an existing one

    Args:
        Model (models.Model): Django Model
        field (str): The name of the main field
        value (str): The value of the main field

    Returns:
        int: The id of the object
    """
    query = {f"{field}": value}
    object, _ = Model.objects.get_or_create(**query) 
        
    return object.id

def get_vacation_days(start_day: date):
    today = date.today()
    
    antique = today.year - start_day.year + 1
    days_of_vacation = 0
    
    for i in range(antique - 3, antique + 1):
        if i > 10:
            days = 30
        elif i > 5:
            days = 21
        elif i > 0:
            days = 15
        else:
            days = 0
        days_of_vacation += days
        
        
    return days_of_vacation