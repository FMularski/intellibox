from django.contrib.auth import get_user_model
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save


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


@receiver(post_save, sender=User)
def create_user_post_save_handler(instance, created, **kwargs):
    if created:
        user_root_box = Box()
        user_root_box.owner = instance
        user_root_box.name = 'main'
        user_root_box.location = ''

        user_root_box.save() 
