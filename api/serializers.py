from rest_framework import serializers
from . import models


class BoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Box
        fields = '__all__'



class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.File
        fields = '__all__'
