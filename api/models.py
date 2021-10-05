from django.contrib.auth import get_user_model
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete


User = get_user_model()


class Item(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=1024, blank=True)
    last_modified = models.DateField(auto_now_add=True)
    is_favourite = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)


class Box(Item):
    parent_box = models.ForeignKey('Box', on_delete=models.CASCADE, null=True, blank=True, related_name='inner_boxes')
    files_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'[Box] {self.name}'

    def save(self, *args, **kwargs):
        self.location = get_location(self)
        super(Box, self).save(*args, **kwargs)


class File(Item):
    parent_box = models.ForeignKey('Box', on_delete=models.CASCADE, related_name='inner_files')
    instance = models.FileField()
    size = models.BigIntegerField(blank=True)
    category = models.CharField(max_length=16, blank=True)


    def __str__(self):
        return f'[File] {self.name}'

    def save(self, *args, **kwargs):
        self.location = get_location(self)
        self.size = self.instance.size
        self.category = set_category(extension=self.instance.name.split('.')[-1].lower())
        super(File, self).save(*args, **kwargs)


@receiver(post_save, sender=User)
def create_user_post_save_handler(instance, created, **kwargs):
    if created:
        user_root_box = Box()
        user_root_box.owner = instance
        user_root_box.name = 'main'
        user_root_box.location = ''

        user_root_box.save() 


@receiver(post_save, sender=Box)
@receiver(post_save, sender=File)
def item_post_save_handler(instance, created, **kwargs):
    if created and instance.parent_box: 
        instance.parent_box.files_count += 1
        instance.parent_box.save()


@receiver(pre_delete, sender=Box)
@receiver(pre_delete, sender=File)
def item_pre_delete_handler(instance, **kwargs):
    if instance.parent_box:
        instance.parent_box.files_count -= 1
        instance.parent_box.save()


def get_location(item):
    location = ''

    current_box = item.parent_box

    while current_box:
        location = current_box.name + '/' + location
        current_box = current_box.parent_box

    return location


def set_category(extension):
    if extension in ['txt']:
        return 'text'

    if extension in ['doc', 'docm', 'docx', 'dotm', 'dotx', 'odt']:
        return 'document'

    if extension in ['3g2', '3gp', 'avi', 'mov', 'flv', 'mkv', 'mp4', 'mpg', 'ogv', 'webm', 'wmv']:
        return 'video'

    if extension in ['bmp', 'eps', 'gif', 'ico', 'jpg', 'png', 'svg', 'jpeg', 'tga', 'tiff', 'wbmp']:
        return 'image'

    if extension in ['aac', 'aaif', 'flac', 'm4a', 'm4r', 'mmf', 'mp3', 'ogg', 'opus', 'wav', 'wma']:
        return 'audio'
    
    if extension in ['pdf']:
        return 'pdf'
    
    if extension in ['xlsx', 'xlsm', 'xlsb', 'xltx']:
        return 'excel'

    if extension in ['pps', 'ppt', 'pptx']:
        return 'powerpoint'

    if extension in ['csv']:
        return 'csv'

    if extension in ['7z', 'bz2', 'gz', 'zip']:
        return 'archive'

    if extension in ['c', 'cgi', 'pl', 'class', 'cpp', 'cs', 'h', 'java', 'php', 'py', 'sh', 'swift', 
        'vb', 'js', 'xml', 'css', 'asp', 'aspx']:
        return 'code'

    return 'not specified'