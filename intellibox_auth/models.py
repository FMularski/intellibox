from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator


class User(AbstractUser):
    pin = models.CharField(max_length=4, validators=[MinLengthValidator(4)])