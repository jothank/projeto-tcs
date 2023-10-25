"""
ProductRegistration URL Configuration
"""
###
# Libs
###
from django.urls import path, include


###
# URL Patterns
###


urlpatterns = [
    path('', include('app.product.api.v1.urls'))
]
