from django.urls import path
from . import views


urlpatterns = [
    path('login-page/', views.LoginPageView.as_view(), name='login_page'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('test-login/', views.TestLoginView.as_view(), name='test_login'),
]