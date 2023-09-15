"""
Variable Expense URL Configuration
"""
###
# Libraries
###
from django.urls import path, include


###
# URL Patterns
###


urlpatterns = [
    path('', include('app.variable_expense.api.v1.urls'))
]
