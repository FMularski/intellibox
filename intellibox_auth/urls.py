from django.urls import path
from . import views


urlpatterns = [
    path('login-page/', views.LoginPageView.as_view(), name='login_page')
]