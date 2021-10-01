from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView


class BoxesView(LoginRequiredMixin, TemplateView):
    login_url = '/login-page/'
    template_name = 'boxes/boxes.html'
