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
from app.fixed_expense.api.v1.serializers.fixed_expense.update import UpdateFixedExpenseSerializer
from app.fixed_expense.models.fixed_expense import FixedExpense
from app.fixed_expense.models.expense_fixed_expense import FixedExpenseCost


###
# Viewsets
###
class FixedExpenseViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveFixedExpenseSerializer
        elif self.action == 'create':
            return CreateFixedExpenseSerializer
        elif self.action == 'update':
            return UpdateFixedExpenseSerializer
        else:
            return DefaultFixedExpenseSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            return user.fixedexpense_set.all()

        else:
            return FixedExpense.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        costs = serializer.validated_data.pop('costs')
        fixed_expense = serializer.save(user=user)
        for cost in costs:
            FixedExpenseCost.objects.create(
                fixed_expense=fixed_expense, cost=cost, user=user)
