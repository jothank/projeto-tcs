from django.conf import settings

def frontend_url(request):
    return {'FE_URL': settings.FE_URL}
