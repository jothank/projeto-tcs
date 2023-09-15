"""
Pricing URL Configuration
"""
###
# Libraries
###
from django.urls import path, include


###
# URL Patterns
###


urlpatterns = [
    path('', include('app.pricing.api.v1.urls'))
]
