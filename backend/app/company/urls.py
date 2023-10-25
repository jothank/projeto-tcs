"""
Company URL Configuration
"""
###
# Libs
###
from django.urls import path, include


###
# URL Patterns
###


urlpatterns = [
    path('', include('app.company.api.v1.urls'))
]
