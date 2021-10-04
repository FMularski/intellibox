from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import BoxSerializer, FileSerializer
from .models import Box


class BoxListView(APIView):
    def get(self, request):
        boxes = Box.objects.filter(owner=request.user)
        serializer = BoxSerializer(boxes, many=True)
        return Response(serializer.data)


class OpenBoxView(APIView):
    def get(self, request, pk):
        box = Box.objects.prefetch_related('inner_boxes', 'inner_files').get(pk=pk)
        
        box_serializer = BoxSerializer(box)
        inner_boxes_serializer = BoxSerializer(box.inner_boxes.all(), many=True)
        inner_files_serializer = FileSerializer(box.inner_files.all(), many=True) 
        
        return Response({
            'box': box_serializer.data,
            'innerBoxes': inner_boxes_serializer.data,
            'innerFiles': inner_files_serializer.data
        })


class OpenRootBoxView(OpenBoxView):
    def get(self, request):
        root_box = Box.objects.get(owner=request.user, parent_box__isnull=True)
        return super().get(request, root_box.pk)