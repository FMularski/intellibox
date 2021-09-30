from django.views.generic import TemplateView


class BoxesView(TemplateView):
    template_name = 'boxes/boxes.html'
