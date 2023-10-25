"""
API V1: Variable Expense Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.variable_expense.models.variable_expense import VariableExpense
from app.variable_expense.api.v1.serializers.variable_expense.default import DefaultVariableExpenseSerializer

###
# Viewsets
###


class VariableExpenseViewSet(viewsets.ModelViewSet):
    queryset = VariableExpense.objects.all()
    serializer_class = DefaultVariableExpenseSerializer
