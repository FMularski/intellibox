from django.contrib import admin
from . import models


class BoxAdmin(admin.ModelAdmin):
    list_display = 'pk', 'owner', 'name', 'location', 'files_count'


class FileAdmin(admin.ModelAdmin):
    list_display = 'pk', 'owner', 'name', 'location',


admin.site.register(models.Box, BoxAdmin)
admin.site.register(models.File, FileAdmin)
