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


class SearchBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Box
        fields = 'id', 'name', 'location'


class SearchFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.File
        fields = 'id', 'name', 'location', 'category'


