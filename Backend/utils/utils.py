from django.db import models

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
    
    object, created = Model.objects.get_or_create(**query) 
        
    return object.id