"""
Pricing URL Configuration
"""
###
# Libs
###
from django.urls import path, include


###
# URL Patterns
###


urlpatterns = [
    path('', include('app.production_simulator.api.v1.urls'))
]
