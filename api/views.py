from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import BoxSerializer, FileSerializer
from .models import Box, File, Item


class BoxListView(APIView):
    def get(self, request):
        boxes = Box.objects.filter(owner=request.user)
        serializer = BoxSerializer(boxes, many=True)
        return Response(serializer.data)


class OpenBoxView(APIView):
    def get(self, request, pk):
        box = Box.objects.prefetch_related('inner_boxes', 'inner_files').get(pk=pk)
        
        box_serializer = BoxSerializer(box)
        inner_boxes_serializer = BoxSerializer(box.inner_boxes.all().order_by('-is_favourite'), many=True)
        inner_files_serializer = FileSerializer(box.inner_files.all().order_by('-is_favourite'), many=True) 
        
        return Response({
            'box': box_serializer.data,
            'innerBoxes': inner_boxes_serializer.data,
            'innerFiles': inner_files_serializer.data
        })


class OpenRootBoxView(OpenBoxView):
    def get(self, request):
        root_box = Box.objects.get(owner=request.user, parent_box__isnull=True)
        return super().get(request, root_box.pk)


class PreviewFileView(APIView):
    def get(self, request, pk):
        file = File.objects.get(pk=pk)
        file_serializer = FileSerializer(file)

        return Response(file_serializer.data)


class FavouritesView(APIView):
    def get(self, request):
        favourite_boxes = Box.objects.filter(owner=request.user, is_favourite=True)
        fav_boxes_serializer = BoxSerializer(favourite_boxes, many=True)

        favourite_files = File.objects.filter(owner=request.user, is_favourite=True)
        fav_files_serializer = FileSerializer(favourite_files, many=True)

        return Response({
            'innerBoxes': fav_boxes_serializer.data,
            'innerFiles': fav_files_serializer.data
        })


class MarkAsFavouriteView(APIView):
    def post(self, request, pk):
        item = Item.objects.get(pk=pk)
        item.is_favourite = not item.is_favourite
        item.save()

        return Response({'is_favourite': item.is_favourite})