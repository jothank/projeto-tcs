"""
Fixed Expense URL Configuration
"""
###
# Libraries
###
from django.urls import path, include


###
# URL Patterns
###


urlpatterns = [
    path('', include('app.expense.api.v1.urls'))
]
