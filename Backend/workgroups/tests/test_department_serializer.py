from django.test import TestCase
from workgroups.models import Department
from workgroups.serializers import DepartmentSerializer

class DepartmentSerializerTest(TestCase):

    def setUp(self):
        self.valid_data = {"title": "Human Resources"}
        self.invalid_title_data = {"title": "not-valid not-valid not-valid not-valid not-valid 1"} # More than 50 characters
        self.missing_title_data = {}
        
        
    def test_correct_serialization(self):
        department = Department.objects.create(**self.valid_data)
        
        serializer = DepartmentSerializer(department)
        
        self.assertEqual(serializer.data["title"], self.valid_data["title"])
        
        
    def test_deserialization_creation(self):
        serializer = DepartmentSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        department = serializer.save()
        
        self.assertEqual(department.title, self.valid_data["title"])
        
        
    def test_invalid_title(self):
        serializer = DepartmentSerializer(data=self.invalid_title_data)
        self.assertFalse(serializer.is_valid())
        
        self.assertIn("title", serializer.errors)
        
        
    def test_missing_title(self):
        serializer = DepartmentSerializer(data=self.missing_title_data)
        
        self.assertFalse(serializer.is_valid())
        self.assertIn("title", serializer.errors)