from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from workgroups.models import Team

class TeamAPITest(APITestCase):
    
    def setUp(self):
        self.team = Team.objects.create(title="Team A")
        self.valid_data = {"title": "Team B"}
        self.invalid_title_data = {"title": ""}
        
        self.url_list = reverse("team-list-create")
        self.url_detail = reverse("team-detail", args=[self.team.id])
        
        
    def test_get_team_list(self):
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], self.team.title)
        
        
    def test_get_team_detail(self):
        response = self.client.get(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], self.team.title)
        
        
    def test_create_team(self):
        response = self.client.post(self.url_list, self.valid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Team.objects.count(), 2)
        self.assertEqual(Team.objects.latest("id").title, self.valid_data["title"])
        
        
    def test_update_team(self):
        update_data = {"title": "Team C"}
        
        response = self.client.put(self.url_detail, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.team.refresh_from_db()
        self.assertEqual(self.team.title, update_data["title"])
        
        
    def test_partial_update_team(self):
        update_data = {"title": "Team D"}
        
        response = self.client.patch(self.url_detail, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
        self.team.refresh_from_db()
        self.assertEqual(self.team.title, update_data["title"])
        
        
    def test_delete_team(self):
        response = self.client.delete(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        self.assertEqual(Team.objects.count(), 0)
        
        
    def test_create_invalid_team(self):
        response = self.client.post(self.url_list, self.invalid_title_data, form="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", response.data["message"])
        self.assertEqual(Team.objects.count(), 1)