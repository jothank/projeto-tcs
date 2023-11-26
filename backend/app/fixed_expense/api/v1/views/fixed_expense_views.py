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


###
# Viewsets
###
class FixedExpenseViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveFixedExpenseSerializer
        elif self.action == 'create':
            return CreateFixedExpenseSerializer
        elif self.action in ['update', 'partial_update']:
            return UpdateFixedExpenseSerializer
        else:
            return DefaultFixedExpenseSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return user.fixedexpense_set.all().order_by('id')
        else:
            return FixedExpense.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)
