"""
Feedstock URL Configuration
"""
###
# Libraries
###
from django.urls import path, include


###
# URL Patterns
###


urlpatterns = [
    path('', include('app.feedstock.api.v1.urls')),
]
