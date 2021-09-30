from django.contrib.auth import views as auth_views
from django.urls import path
from . import views


urlpatterns = [
    path('', views.LoginPageView.as_view(), name='login_page'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('test-login/', views.TestLoginView.as_view(), name='test_login'),

    path('password_reset/', 
        auth_views.PasswordResetView.as_view(template_name='intellibox_auth/password_reset.html'), 
        name='password_reset'
    ),
    path('password_reset/done/', 
        auth_views.PasswordResetDoneView.as_view(template_name='intellibox_auth/password_reset_done.html'), 
        name='password_reset_done'
    ),
    path('password_reset/<uidb64>/<token>/', 
        auth_views.PasswordResetConfirmView.as_view(template_name='intellibox_auth/password_reset_confirm.html'), 
        name='password_reset_confirm'
    ),
    path('password_reset/complete/', 
        auth_views.PasswordResetCompleteView.as_view(template_name='intellibox_auth/password_reset_complete.html'), 
        name='password_reset_complete'
    ),
]