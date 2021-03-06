from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Box, File, Item
from .serializers import (
    BoxSerializer, 
    FileSerializer, 
    SearchBoxSerializer, 
    SearchFileSerializer
)


class StorageView(APIView):
    def get(self, request):
        storage_used = request.user.storage_used
        storage_limit = request.user.storage_limit

        return Response({
            'storageUsed': storage_used,
            'storageLimit': storage_limit,
            'storagePercentage': storage_used / storage_limit
        })


class ParentBoxesListView(APIView):
    def get(self, request):
        parent_boxes = Box.objects.filter(owner=request.user, is_deleted=False).order_by('name')
        parent_boxes_serializer = BoxSerializer(parent_boxes, many=True)

        return Response(parent_boxes_serializer.data)


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
        found_boxes_serializer = SearchBoxSerializer(found_boxes, many=True)

        found_files = File.objects.filter(owner=request.user, name__istartswith=input, is_deleted=False)
        found_files_serializer = SearchFileSerializer(found_files, many=True)

        return Response({
            'foundBoxes': found_boxes_serializer.data,
            'foundFiles': found_files_serializer.data
        })


class AddItemView(APIView):
    def post(self, request, parent_box_id):
        item_type = request.POST.get('type')
        parent_box = Box.objects.get(pk=parent_box_id)

        if item_type == 'box':
            box_name = request.POST.get('name')
            new_box = Box(owner=request.user, parent_box=parent_box, name=box_name)
            new_box.save()

            new_box_serializer = BoxSerializer(new_box)
            return Response({
                'item': new_box_serializer.data,
                'type': 'Box'
            })

        if item_type == 'file':
            # get the files from formdata
            uploaded_files = request.FILES.getlist('file')

            # check if enough storage before saving
            total_size = 0
            for uploaded in uploaded_files:
                total_size += uploaded.size

            if total_size > (request.user.storage_limit - request.user.storage_used):
                raise Exception('Not enough space.')
                # return Response({
                #     'msg': 'Not enough space to upload file(s).'
                # })    
            
            # arroy for serializer            
            saved_files = []
            for uploaded in uploaded_files:
                new_file = File(owner=request.user, parent_box=parent_box, instance=uploaded)
                new_file.save()
                saved_files.append(new_file)
                request.user.storage_used += uploaded.size

            request.user.save()
            saved_files_serializer = FileSerializer(saved_files, many=True)

            return Response({
                'items': saved_files_serializer.data,
                'type': 'File'
            })


class RemoveItemView(APIView):
    def post(self, request, pk):
        '''
            cannot do Item.objects.get as Item model does not have parent_model field
            so firstly look for box with matching id and then file 
        '''
        try:
            item = Box.objects.get(pk=pk)
        except Box.DoesNotExist:
            item = File.objects.get(pk=pk)

        parent_box = item.parent_box
        item_size = item.size
        
        item.delete()
        # restore used storage 
        request.user.storage_used -= item_size
        request.user.save()

        return Response({'parentBoxId': parent_box.id})


class GetItemLinkView(APIView):
    def get(self, request, pk):
        file = File.objects.get(pk=pk)
        return Response(file.instance.url)


class MoveItemView(APIView):
    def post(self, request, pk, parent_pk):
        try:
            item = Box.objects.get(pk=pk)
        except Box.DoesNotExist:
            item = File.objects.get(pk=pk)

        old_parent = item.parent_box
        new_parent = Box.objects.get(pk=parent_pk)

        item.parent_box = new_parent
        
        item.save()
        old_parent.save()

        return Response({'newParentId': new_parent.id})