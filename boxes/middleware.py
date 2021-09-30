from django.shortcuts import redirect, reverse

class RedirectToLoginMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        if request.user.is_authenticated and request.path in ['/']:
            return redirect(reverse('boxes', ))

        response = self.get_response(request)
        return response