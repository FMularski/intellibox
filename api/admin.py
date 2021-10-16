from django.contrib import admin
from . import models


class ItemAdmin(admin.ModelAdmin):
    pass


class BoxAdmin(admin.ModelAdmin):
    list_display = 'pk', 'owner', 'name', 'location', 'files_count', 'size'


class FileAdmin(admin.ModelAdmin):
    list_display = 'pk', 'owner', 'name', 'location', 'size', 'category'


admin.site.register(models.Item, ItemAdmin)
admin.site.register(models.Box, BoxAdmin)
admin.site.register(models.File, FileAdmin)
