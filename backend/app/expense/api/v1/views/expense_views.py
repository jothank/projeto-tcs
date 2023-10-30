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
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return user.expense_set.all()
        else:
            return Expense.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateExpenseSerializer
        else:
            return DefaultExpenseSerializer
