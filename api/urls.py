from django.urls import path
from . import views


urlpatterns = [
    path('get_boxes/', views.BoxListView.as_view(), name='get_boxes'),
    path('open_box/<int:pk>/', views.OpenBoxView.as_view(), name='open_box'),
    path('open_root/', views.OpenRootBoxView.as_view(), name='open_root'),
]