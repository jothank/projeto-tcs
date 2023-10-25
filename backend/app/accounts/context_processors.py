###
# Libs
###
from django.conf import settings


###
# Context Processors
###
def frontend_url(request):
    return {'FE_URL': settings.FE_URL}
