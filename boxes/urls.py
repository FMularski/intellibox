from django.urls import path
from . import views

urlpatterns = [
    path('', views.BoxesView.as_view(), name='boxes')
]