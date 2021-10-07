from django.urls import path
from . import views


urlpatterns = [
    path('get_boxes/', views.BoxListView.as_view(), name='get_boxes'),
    path('open_box/<int:pk>/', views.OpenBoxView.as_view(), name='open_box'),
    path('open_root/', views.OpenRootBoxView.as_view(), name='open_root'),
    path('preview_file/<int:pk>/', views.PreviewFileView.as_view(), name='preview_file'),
    path('favourites/', views.FavouritesView.as_view(), name='favourites'),
    path('recent/', views.RecentView.as_view(), name='recent'),
    path('mark_as_favourite/<int:pk>/', views.MarkAsFavouriteView.as_view(), name='mark_as_favourite'),
]