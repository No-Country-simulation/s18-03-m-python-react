from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from users.models import City

class CityAPITest(APITestCase):
    
    def setUp(self):
        self.city = City.objects.create(name="Manager")
        self.valid_data = {"name": "Back-end"}
        self.invalid_name_data = {"name": ""}
        
        self.url_list = reverse("city-list-create")
        self.url_detail = reverse("city-detail", args=[self.city.id])
        
        
    def test_get_city_list(self):
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], self.city.name)
        
        
    def test_get_city_detail(self):
        response = self.client.get(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.city.name)
        
        
    def test_create_city(self):
        response = self.client.post(self.url_list, self.valid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(City.objects.count(), 2)
        self.assertEqual(City.objects.latest("id").name, self.valid_data["name"])
        
        
    def test_update_city(self):
        update_data = {"name": "Front-end"}
        
        response = self.client.put(self.url_detail, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.city.refresh_from_db()
        self.assertEqual(self.city.name, update_data["name"])
        
        
    def test_partial_update_city(self):
        update_data = {"name": "Tester"}
        
        response = self.client.patch(self.url_detail, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.city.refresh_from_db()
        self.assertEqual(self.city.name, update_data["name"])
        
        
    def test_delete_city(self):
        response = self.client.delete(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        self.assertEqual(City.objects.count(), 0)
        
        
    def test_create_invalid_city(self):
        response = self.client.post(self.url_list, self.invalid_name_data, form="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data["message"])
        self.assertEqual(City.objects.count(), 1)