"""
ProductRegistration URL Configuration
"""
###
# Libraries
###
from django.urls import path, include


###
# URL Patterns
###


urlpatterns = [
    path('', include('app.product_registration.api.v1.urls'))
]
