"""
Accounts URL Configuration
"""
###
# Libraries
###
from django.urls import path, include


###
# URL Patterns
###


urlpatterns = [
    path('', include('app.accounts.api.v1.urls'))
]