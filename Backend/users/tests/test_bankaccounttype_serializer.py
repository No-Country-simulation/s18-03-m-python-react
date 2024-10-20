from django.test import TestCase
from users.models import BankAccountType
from users.serializers import BankAccountTypeSerializer

class BankAccountTypeSerializerTest(TestCase):
    
    def setUp(self):
        self.valid_data = {"name": "Back-end"}
        self.invalid_name_data = {"name": "not-valid not-valid not-valid not-valid not-valid 1"}
        self.missing_name_data = {}


    def test_correct_serialization(self):
        role = BankAccountType.objects.create(**self.valid_data)
        
        serializer = BankAccountTypeSerializer(role)
        
        self.assertEqual(serializer.data["name"], self.valid_data["name"])
        
        
    def test_serialization_creation(self):
        serializer = BankAccountTypeSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        role = serializer.save()
        
        self.assertEqual(role.name, self.valid_data["name"])
        
        
    def test_invalid_name(self):
        serializer = BankAccountTypeSerializer(data=self.invalid_name_data)
        self.assertFalse(serializer.is_valid())
        
        self.assertIn("name", serializer.errors)
        
        
    def test_missing_name(self):
        serializer = BankAccountTypeSerializer(data=self.missing_name_data)
        
        self.assertFalse(serializer.is_valid())
        self.assertIn("name", serializer.errors)