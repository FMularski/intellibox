from django.views.generic import View, TemplateView
from django.http import JsonResponse
from .forms import RegisterForm


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
            form.save()
            # send a welcome mail
            return JsonResponse({'status': 200, 'message': f'User \'{username}\' has been registered.'})
        else:
            return JsonResponse({'status': '400', 'message': form.errors})

