from django.test import TestCase
from workgroups.models import Team
from workgroups.serializers import TeamSerializer

class TeamSerializerTest(TestCase):
    
    def setUp(self):
        self.valid_data = {"title": "Team A"}
        self.invalid_title_data = {"title": "not-valid not-valid not-valid not-valid not-valid 1"}
        self.missing_title_data = {}
        
    def test_correct_serialization(self):
        team = Team.objects.create(**self.valid_data)
        
        serializer = TeamSerializer(team)
        
        self.assertEqual(serializer.data["title"], self.valid_data["title"])
        
        
    def test_deserialization_creation(self):
        serializer = TeamSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        team = serializer.save()
        
        self.assertEqual(team.title, self.valid_data["title"])
        
        
    def test_invalid_title(self):
        serializer = TeamSerializer(data=self.invalid_title_data)
        self.assertFalse(serializer.is_valid())
        
        self.assertIn("title", serializer.errors)
        
        
    def test_missing_title(self):
        serializer = TeamSerializer(data=self.missing_title_data)
        
        self.assertFalse(serializer.is_valid())
        self.assertIn("title", serializer.errors)