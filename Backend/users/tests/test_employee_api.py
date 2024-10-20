from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from workgroups.models import Department, Role, Team
from users.models import Employee, Person

class EmployeeAPITest(APITestCase):
    
    def setUp(self):
        for i in [Department, Role, Team]:
            for _ in range(3):
                i.objects.create(title=f"test{_}") # DO NOT change this name, pk references depends on this
        self.person = Person.objects.create(dni="143242", email="emailperson@gmail.com")
        self.employee = Employee.objects.create(start_date='2024-06-01', salary=45999, working_day="Only mondays", role=Role.objects.get(title="test1"), person=self.person)
        self.employee.team.add(Team.objects.get(title="test1"))
        self.valid_data = {
            "dni": 111,
            "email": "test@gmail.com",
            "employee" : {
            "start_date": "2021-06-15",
            "department": Department.objects.get(title="test1").id,
            "team": [1],
            "role": Role.objects.get(title="test1").id,
            "salary": 45000,
            "working_day": "Lunes de viernes de 8 a 17"
            }
        }
         
        self.invalid_data_list = [
            {
                "employee": {
                "start_date": "15/06/2021",
                "department": "sss",
                "team": [Team.objects.get(title="test2").id],
                "role": Role.objects.get(title="test1").id,
                "salary": -5000, 
                "working_day": "Full time"
                }
            },
            {
                "employee": {
                "start_date": "2021-02-30",
                "department": "HR",  
                "team": [],
                "role": "",
                "salary": "fifty thousand",
                "working_day": 40
                }
            },
            {
                "employee": {
                "start_date": "",
                "department": Department.objects.get(title="test2").id,
                "team": [Team.objects.get(title="test1").id, Team.objects.get(title="test2").id],
                "role": Role.objects.get(title="test1").id,
                "salary": 30000,
                "working_day": "Esta descripción del día laboral es demasiado larga y excede el límite máximo de caracteres permitidos para este campo, que es de 200 caracteres. Este texto se ha extendido deliberadamente para provocar un error de validación en la base de datos y comprobar cómo se maneja."
                }
            }
        ]
        
        self.url_list = reverse("employee-list-create")
        self.url_detail = reverse("employee-detail", args=[self.employee.person.id])
        
        
    def test_get_employee_list(self):
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["employee"]["salary"], self.employee.salary)
        self.assertEqual(response.data[0]["employee"]["working_day"], self.employee.working_day)
        
    def test_get_employee_detail(self):
        response = self.client.get(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["employee"]["salary"], self.employee.salary)
        self.assertEqual(response.data["employee"]["working_day"], self.employee.working_day)
        
    def test_create_employee(self):
        response = self.client.post(self.url_list, self.valid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.json())
        self.assertEqual(Employee.objects.count(), 2)
        self.assertEqual(Employee.objects.latest("id").salary, self.valid_data["employee"]["salary"])
        self.assertEqual(Employee.objects.latest("id").working_day, self.valid_data["employee"]["working_day"])
        
    def test_update_employee(self):
        update_data = {
            "employee": {
            "start_date": "2021-06-15",
            "department": "department",
            "team": ["team"],
            "role": "role",
            "salary": 45000,
            "working_day": "Weekend"
            }
        }
        
        response = self.client.put(self.url_detail, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.employee.refresh_from_db()
        self.assertEqual(self.employee.working_day, update_data["employee"]["working_day"])
        
        
    def test_partial_update_employee(self):
        update_data = {
            "employee": {
                "salary": 50000
            }
        }
        
        response = self.client.patch(self.url_detail, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.employee.refresh_from_db()
        self.assertEqual(self.employee.salary, update_data["employee"]["salary"])
        
        
    def test_delete_role(self):
        response = self.client.delete(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        self.assertEqual(Employee.objects.count(), 0)
        
        
    def test_create_invalid_employees(self):
        for invalid_data in self.invalid_data_list:
            response = self.client.post(self.url_list, invalid_data, format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertEqual(Employee.objects.count(), 1)
        