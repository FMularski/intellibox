from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator


class User(AbstractUser):
    pin = models.CharField(max_length=4, validators=[MinLengthValidator(4)])
    storage_limit = models.PositiveBigIntegerField(default=1024 * 1024 * 1024 * 2) # 2 GB
    storage_used = models.PositiveBigIntegerField(default=0)
    