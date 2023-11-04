"""
Fixed Expense URL Configuration
"""
###
# Libs
###
from django.urls import path, include


###
# URL Patterns
###


urlpatterns = [
    path('', include('app.cost.api.v1.urls'))
]
