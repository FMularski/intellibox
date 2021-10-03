from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class Item(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    parent_box = models.ForeignKey('Box', on_delete=models.CASCADE)
    location = models.CharField(max_length=1024)
    last_modified = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)
    is_favourite = models.BooleanField(default=False)
    size = models.DecimalField(max_digits=10, decimal_places=2)


class Box(Item):
    def __str__(self):
        return f'[Box] {self.name}'


class File(Item):
    url = models.URLField(max_length=1024)

    def __str__(self):
        return f'[File] {self.name}'