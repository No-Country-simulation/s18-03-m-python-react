from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from vacations.models import Vacation, VacationRequest
from users.models import Employee

class VacationResponse(APITestCase):
    
    def setUp(self):
        # Creates vacations requests
        employee = Employee.objects.create()
        self.vacation_1 = VacationRequest.objects.create(employee=employee, start='2024-01-01', end='2024-02-01')
        self.vacation_2 = VacationRequest.objects.create(employee=employee, start='2024-01-05', end='2024-03-02')
        
        self.url = reverse("vacation-response")
        
    def test_post_accept(self):
        self.assertEqual(Vacation.objects.filter(employee=self.vacation_1.employee, start=self.vacation_1.start, end=self.vacation_1.end).exists(), False)
        data = {
            "vacation": self.vacation_1.id,
            "status": True,
            "message": "Vacations accepted",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.vacation_1.refresh_from_db()
        self.assertEqual(self.vacation_1.status, "A")
        
        self.assertEqual(Vacation.objects.filter(employee=self.vacation_1.employee, start=self.vacation_1.start, end=self.vacation_1.end).exists(), True)
        
        
    def test_post_dennied(self):
        self.assertEqual(Vacation.objects.filter(employee=self.vacation_1.employee, start=self.vacation_1.start, end=self.vacation_1.end).exists(), False)
        data = {
            "vacation": self.vacation_1.id,
            "status": False,
            "message": "Vacations dennied",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.vacation_1.refresh_from_db()
        self.assertEqual(self.vacation_1.status, "D")
        
        self.assertEqual(Vacation.objects.filter(employee=self.vacation_1.employee, start=self.vacation_1.start, end=self.vacation_1.end).exists(), False)
        
    
    def test_get(self):
        response = self.client.get(self.url)
        
        self.assertEqual(len(response.data), 0)
        data_1 = {
            "vacation": self.vacation_1.id,
            "status": True,
            "message": "Vacations accepted",
        }
        data_2 = {
            "vacation": self.vacation_2.id,
            "status": False,
            "message": "Vacations dennied",
        }
        
        response = self.client.post(self.url, data=data_1, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg="Error in post")
        response = self.client.post(self.url, data=data_2, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg="Error in post")
        
        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 2)