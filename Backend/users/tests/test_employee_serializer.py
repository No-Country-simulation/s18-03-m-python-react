from django.test import TestCase
from django.core.exceptions import ValidationError
from users.models import Employee, Department, Role, Team
from users.serializers import EmployeeSerializer

class EmployeeSeriazlierTest(TestCase):
    
    def create_auxiliar_models(self):
        for i in [Department, Role, Team]:
            for _ in range(3):
                i.objects.create(id=(_ + 1), title="test")
                
    
    def setUp(self):
        self.create_auxiliar_models()
        
        self.valid_data = {
            "start_date": "2021-06-15",
            "department": Department.objects.get(id=1),
            "team": [Team.objects.get(id=1)],
            "role": Role.objects.get(id=1),
            "salary": 45000,
            "working_day": "Lunes de viernes de 8 a 17"
        }
        
        self.invalid_data_list = [
            {
                "start_date": "15/06/2021",
                "department": None,
                "team": [Team.objects.get(id=2)],
                "role": Role.objects.get(id=1),
                "salary": -5000, 
                "working_day": "Full time"
            },
            {
                "start_date": "2021-02-30",
                "department": "HR",  
                "team": [],
                "role": "",
                "salary": "fifty thousand",
                "working_day": 40  
            },
            {
                "start_date": None,
                "department": 0,
                "team": [Team.objects.get(id=1), Team.objects.get(id=2)],
                "role": Role.objects.get(id=1),
                "salary": 30000,
                "working_day": "Esta descripción del día laboral es demasiado larga y excede el límite máximo de caracteres permitidos para este campo, que es de 200 caracteres. Este texto se ha extendido deliberadamente para provocar un error de validación en la base de datos y comprobar cómo se maneja."
            }
        ]
        
    def create_employee(self, data):
        employee_team = data.pop("team")
        
        employee = Employee.objects.create(**data)
        
        for team in employee_team:
            employee.team.add(team)
            
        return employee
            

        
    def test_correct_serialization(self):
        valid_data_copy = self.valid_data.copy()
        
        employee = self.create_employee(valid_data_copy)
        
        serializer = EmployeeSerializer(employee)
        
        self.assertEqual(serializer.data["start_date"], self.valid_data["start_date"])
        self.assertEqual(serializer.data["department"], self.valid_data["department"].id)
        self.assertEqual(serializer.data["team"], [team.id for team in self.valid_data["team"]])
        self.assertEqual(serializer.data["role"], self.valid_data["role"].id)
        self.assertEqual(serializer.data["salary"], self.valid_data["salary"])
        self.assertEqual(serializer.data["working_day"], self.valid_data["working_day"])
        
        
    def test_invalid_serialization(self):
        for invalid_data in self.invalid_data_list:
            try:
                employee = self.create_employee(invalid_data.copy())
                serializer = EmployeeSerializer
                serializer.is_valid()
                failed = False
            except ValidationError:
                failed = True
            except ValueError:
                failed = True
                
            self.assertTrue(failed, True)