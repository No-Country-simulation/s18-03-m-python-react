from django.test import TestCase
from workgroups.models import Role
from workgroups.serializers import RoleSerializer

class RoleSerializerTest(TestCase):
    
    def setUp(self):
        self.valid_data = {"title": "Back-end"}
        self.invalid_title_data = {"title": "not-valid not-valid not-valid not-valid not-valid 1"}
        self.missing_title_data = {}


    def test_correct_serialization(self):
        role = Role.objects.create(**self.valid_data)
        
        serializer = RoleSerializer(role)
        
        self.assertEqual(serializer.data["title"], self.valid_data["title"])
        
        
    def test_serialization_creation(self):
        serializer = RoleSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        role = serializer.save()
        
        self.assertEqual(role.title, self.valid_data["title"])
        
        
    def test_invalid_title(self):
        serializer = RoleSerializer(data=self.invalid_title_data)
        self.assertFalse(serializer.is_valid())
        
        self.assertIn("title", serializer.errors)
        
        
    def test_missing_title(self):
        serializer = RoleSerializer(data=self.missing_title_data)
        
        self.assertFalse(serializer.is_valid())
        self.assertIn("title", serializer.errors)