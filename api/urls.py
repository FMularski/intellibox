from django.urls import path
from . import views


urlpatterns = [
    path('parent_boxes/', views.ParentBoxesListView.as_view(), name='boxes'),
    path('open_box/<int:pk>/', views.OpenBoxView.as_view(), name='open_box'),
    path('open_root/', views.OpenRootBoxView.as_view(), name='open_root'),
    path('preview_file/<int:pk>/', views.PreviewFileView.as_view(), name='preview_file'),
    path('favourites/', views.FavouritesView.as_view(), name='favourites'),
    path('recent/', views.RecentView.as_view(), name='recent'),
    path('bin/', views.BinView.as_view(), name='bin'),
    path('mark_as_favourite/<int:pk>/', views.MarkAsFavouriteView.as_view(), name='mark_as_favourite'),
    path('search/<str:input>/', views.SearchView.as_view(), name='search'),
    path('add-item/<int:parent_box_id>/', views.AddItemView.as_view(), name='add_item'),
    path('remove-item/<int:pk>/', views.RemoveItemView.as_view(), name='remove'),
]