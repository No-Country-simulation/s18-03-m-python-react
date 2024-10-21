from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from workgroups.models import Role

class RoleAPITest(APITestCase):
    
    def setUp(self):
        self.role = Role.objects.create(title="Manager")
        self.valid_data = {"title": "Back-end"}
        self.invalid_title_data = {"title": ""}
        
        self.url_list = reverse("role-list-create")
        self.url_detail = reverse("role-detail", args=[self.role.id])
        
        
    def test_get_role_list(self):
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], self.role.title)
        
        
    def test_get_role_detail(self):
        response = self.client.get(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], self.role.title)
        
        
    def test_create_role(self):
        response = self.client.post(self.url_list, self.valid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Role.objects.count(), 2)
        self.assertEqual(Role.objects.latest("id").title, self.valid_data["title"])
        
        
    def test_update_role(self):
        update_data = {"title": "Front-end"}
        
        response = self.client.put(self.url_detail, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.role.refresh_from_db()
        self.assertEqual(self.role.title, update_data["title"])
        
        
    def test_partial_update_role(self):
        update_data = {"title": "Tester"}
        
        response = self.client.patch(self.url_detail, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.role.refresh_from_db()
        self.assertEqual(self.role.title, update_data["title"])
        
        
    def test_delete_role(self):
        response = self.client.delete(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        self.assertEqual(Role.objects.count(), 0)
        
        
    def test_create_invalid_role(self):
        response = self.client.post(self.url_list, self.invalid_title_data, form="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", response.data["message"])
        self.assertEqual(Role.objects.count(), 1)