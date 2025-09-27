from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

class CustomUser(AbstractUser):
    # We will use email as the unique identifier instead of username
    username = None
    email = models.EmailField(unique=True)
    
    first_name = None 
    last_name = None
    name = models.CharField(max_length=255)

    # Additional fields from your registration form
    phone_number = models.CharField(max_length=15)
    date_of_birth = models.DateField(null=True, blank=True, db_column='dob')
    gender = models.CharField(max_length=10)
    state = models.CharField(max_length=50)
    district = models.CharField(max_length=50)
    
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('coach', 'Coach'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    is_active = models.BooleanField(default=False)
    # Set email as the USERNAME_FIELD
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name'] # 'name' field can be split into first and last name
    objects = CustomUserManager()
    
    def __str__(self):
        return self.email