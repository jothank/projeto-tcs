"""
API V1: Expense Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.fixed_expense.models.fixed_expense import FixedExpense
from app.expense.models.expense import Expense
from app.expense.api.v1.serializers.expense.default import DefaultExpenseSerializer
from app.expense.api.v1.serializers.expense.create import CreateExpenseSerializer


###
# Viewsets
###
class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = DefaultExpenseSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateExpenseSerializer
        else:
            return DefaultExpenseSerializer
