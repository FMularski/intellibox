from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import BoxSerializer, FileSerializer
from .models import Box, File, Item


class OpenBoxView(APIView):
    def get(self, request, pk):
        box = Box.objects.prefetch_related('inner_boxes', 'inner_files').get(pk=pk)
        box_serializer = BoxSerializer(box)

        sort_by = request.GET.get('sort_by') if request.GET.get('sort_by') else '-is_favourite'

        inner_boxes = box.inner_boxes.filter(is_deleted=False).order_by(sort_by)
        inner_boxes_serializer = BoxSerializer(inner_boxes, many=True)

        inner_files = box.inner_files.filter(is_deleted=False).order_by(sort_by)
        inner_files_serializer = FileSerializer(inner_files, many=True) 
        
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
        sort_by = request.GET.get('sort_by') if request.GET.get('sort_by') else '-is_favourite'

        favourite_boxes = Box.objects.filter(owner=request.user, is_favourite=True, is_deleted=False).order_by(sort_by)
        fav_boxes_serializer = BoxSerializer(favourite_boxes, many=True)

        favourite_files = File.objects.filter(owner=request.user, is_favourite=True, is_deleted=False).order_by(sort_by)
        fav_files_serializer = FileSerializer(favourite_files, many=True)

        return Response({
            'innerBoxes': fav_boxes_serializer.data,
            'innerFiles': fav_files_serializer.data
        })


class RecentView(APIView):
    def get(self, request):
        sort_by = request.GET.get('sort_by') if request.GET.get('sort_by') else '-is_favourite'
        limit = 5

        recent_boxes = Box.objects \
            .filter(owner=request.user, parent_box__isnull=False, is_deleted=False) \
            .order_by('-last_modified').order_by(sort_by)[:limit]
        recent_boxes_serializer = BoxSerializer(recent_boxes, many=True)

        recent_files = File.objects \
            .filter(owner=request.user, is_deleted=False) \
            .order_by('-last_modified').order_by(sort_by)[:limit]
        recent_files_serializer = FileSerializer(recent_files, many=True)

        return Response({
            'innerBoxes': recent_boxes_serializer.data,
            'innerFiles': recent_files_serializer.data
        })


class BinView(APIView):
    def get(self, request):
        sort_by = request.GET.get('sort_by') if request.GET.get('sort_by') else '-is_favourite'

        bin_boxes = Box.objects.filter(owner=request.user, is_deleted=True).order_by(sort_by)
        bin_boxes_serializer = BoxSerializer(bin_boxes, many=True)

        bin_files = File.objects.filter(owner=request.user, is_deleted=True).order_by(sort_by)
        bin_files_serializer = FileSerializer(bin_files, many=True)

        return Response({
            'innerBoxes': bin_boxes_serializer.data,
            'innerFiles': bin_files_serializer.data
        })


class MarkAsFavouriteView(APIView):
    def post(self, request, pk):
        item = Item.objects.get(pk=pk)
        item.is_favourite = not item.is_favourite
        item.save()

        return Response({'is_favourite': item.is_favourite})


class SearchView(APIView):
    def get(self, request, input):
        found_boxes = Box.objects.filter(owner=request.user, name__istartswith=input, is_deleted=False, parent_box__isnull=False)
        found_boxes_serializer = BoxSerializer(found_boxes, many=True)

        found_files = File.objects.filter(owner=request.user, name__istartswith=input, is_deleted=False)
        found_files_serializer = FileSerializer(found_files, many=True)

        return Response({
            'found_boxes': found_boxes_serializer.data,
            'found_files': found_files_serializer.data
        })