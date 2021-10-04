from django.urls import path
from . import views


urlpatterns = [
    path('get_boxes/', views.BoxListView.as_view(), name='get_boxes'),
    path('get_box/<int:pk>/', views.BoxDetailView.as_view(), name='get_box')
]