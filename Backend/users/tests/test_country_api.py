from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from users.models import Country

class CountryAPITest(APITestCase):
    
    def setUp(self):
        self.country = Country.objects.create(name="Manager")
        self.valid_data = {"name": "Back-end"}
        self.invalid_name_data = {"name": ""}
        
        self.url_list = reverse("country-list-create")
        self.url_detail = reverse("country-detail", args=[self.country.id])
        
        
    def test_get_country_list(self):
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], self.country.name)
        
        
    def test_get_country_detail(self):
        response = self.client.get(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.country.name)
        
        
    def test_create_country(self):
        response = self.client.post(self.url_list, self.valid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Country.objects.count(), 2)
        self.assertEqual(Country.objects.latest("id").name, self.valid_data["name"])
        
        
    def test_update_country(self):
        update_data = {"name": "Front-end"}
        
        response = self.client.put(self.url_detail, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.country.refresh_from_db()
        self.assertEqual(self.country.name, update_data["name"])
        
        
    def test_partial_update_country(self):
        update_data = {"name": "Tester"}
        
        response = self.client.patch(self.url_detail, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.country.refresh_from_db()
        self.assertEqual(self.country.name, update_data["name"])
        
        
    def test_delete_country(self):
        response = self.client.delete(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        self.assertEqual(Country.objects.count(), 0)
        
        
    def test_create_invalid_country(self):
        response = self.client.post(self.url_list, self.invalid_name_data, form="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data["message"])
        self.assertEqual(Country.objects.count(), 1)