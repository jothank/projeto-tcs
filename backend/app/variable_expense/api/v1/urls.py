##
# Libraries
##
from django.urls import path, include
from rest_framework import routers
from app.variable_expense.api.v1.views.variable_expense_view import VariableExpenseViewSet


# Routers
router = routers.SimpleRouter()
router.register(r'variable_expense', VariableExpenseViewSet, basename='variable_expense')

# URLs
urlpatterns = [
    path('', include(router.urls)),
]
