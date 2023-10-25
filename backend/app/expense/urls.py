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
    path('', include('app.expense.api.v1.urls'))
]
