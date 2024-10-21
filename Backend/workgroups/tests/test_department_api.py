from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from workgroups.models import Department

class DepartmentAPITest(APITestCase):
    
    def setUp(self):
        self.department = Department.objects.create(title="Human Resources")
        self.valid_data = {"title": "Marketing"}
        self.invalid_title_data = {"title": ""}
        
        self.url_list = reverse("department-list-create")
        self.url_detail = reverse("department-detail", args=[self.department.id])
        
        
    def test_get_department_list(self):
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], self.department.title)
        
        
    def test_get_department_detail(self):
        response = self.client.get(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], self.department.title)
        
        
    def test_create_department(self):
        response = self.client.post(self.url_list, self.valid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Department.objects.count(), 2)
        self.assertEqual(Department.objects.latest("id").title, self.valid_data["title"])
        
        
    def test_update_department(self):
        update_data = {"title": "Finance"}
        
        response = self.client.put(self.url_detail, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.department.refresh_from_db()
        self.assertEqual(self.department.title, update_data["title"])
        
        
    
    def test_partial_update_department(self):
        update_data = {"title": "Sales"}
        
        response = self.client.patch(self.url_detail, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.department.refresh_from_db()
        self.assertEqual(self.department.title, update_data["title"])
        
        
    def test_delete_department(self):
        response = self.client.delete(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        self.assertEqual(Department.objects.count(), 0)
        
        
    def test_create_invalid_department(self):
        response = self.client.post(self.url_list, self.invalid_title_data, form="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", response.data["message"])
        self.assertEqual(Department.objects.count(), 1)