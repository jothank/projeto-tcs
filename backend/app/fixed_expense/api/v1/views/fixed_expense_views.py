"""
API V1: Fixed Expense Views
"""
###
# Libraries
###
from rest_framework import viewsets
from app.fixed_expense.api.v1.serializers.fixed_expense.default import DefaultFixedExpenseSerializer
from app.fixed_expense.models.fixed_expense import FixedExpense


###
# Viewsets
###
class FixedExpenseViewSet(viewsets.ModelViewSet):
    queryset = FixedExpense.objects.all()
    serializer_class = DefaultFixedExpenseSerializer
