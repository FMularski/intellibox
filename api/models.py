from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class Item(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    parent_box = models.ForeignKey('Box', on_delete=models.CASCADE, null=True)
    location = models.CharField(max_length=1024)
    last_modified = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)


class Box(Item):
    files_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'[Box] {self.name}'


class File(Item):
    instance = models.FileField()
    is_favourite = models.BooleanField(default=False)

    def __str__(self):
        return f'[File] {self.name}'