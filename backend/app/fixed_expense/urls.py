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
    path('api/v1/', include('app.fixed_expense.api.v1.urls'))
]
