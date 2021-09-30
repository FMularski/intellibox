from django.views.generic import View, TemplateView
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import redirect, reverse
from .forms import RegisterForm
from smtplib import SMTPException


class LoginPageView(TemplateView):
    template_name = 'intellibox_auth/login_page.html'

    def get_context_data(self, **kwargs):
        register_form = RegisterForm()
        context = {'register_form': register_form}
        return context


class RegisterView(View):
    def post(self, request):
        form = RegisterForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password1')
            pin = form.cleaned_data.get('pin')

            form.save()

            message_extension = ''
            try:
                send_mail(
                    subject='Welcome to Intellibox!',
                    message=f'''
                    Thank you for your register!

                    Here is your account data:
                    username: {username}
                    email: {email}
                    password: {password}
                    PIN: {pin}

                    Have fun with our app!
                    Intellibox team
                    ''',
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[email],
                    fail_silently=False
                )
            except SMTPException:
                message_extension = '\nCould not send a welcome message.'


            return JsonResponse({'status': 200, 'message': f'User \'{username}\' has been registered.{message_extension}'})
        else:
            return JsonResponse({'status': '400', 'message': form.errors})


class LoginView(View):
    def post(self, request):
        username = request.POST.get('username-login')
        password = request.POST.get('password-login')

        user = authenticate(request, username=username, password=password)

        if not user:
            return JsonResponse({'status': 400, 'message': 'Invalid credentials.'})

        login(request, user)
        return JsonResponse({'status': 200})


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect(reverse('login_page', ))

class TestLoginView(TemplateView):
    template_name = 'intellibox_auth/test_login.html'
