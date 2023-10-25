"""
API V1: Fixed Expense Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.fixed_expense.api.v1.serializers.fixed_expense.default import DefaultFixedExpenseSerializer
from app.fixed_expense.api.v1.serializers.fixed_expense.create import CreateFixedExpenseSerializer
from app.fixed_expense.api.v1.serializers.fixed_expense.retrieve import RetrieveFixedExpenseSerializer
from app.fixed_expense.models.fixed_expense import FixedExpense


###
# Viewsets
###
class FixedExpenseViewSet(viewsets.ModelViewSet):
    queryset = FixedExpense.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveFixedExpenseSerializer
        elif self.action == 'create':
            return CreateFixedExpenseSerializer
        else:
            return DefaultFixedExpenseSerializer
