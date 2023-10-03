"""
API V1: Fixed Expense Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.fixed_expense.models.fixed_expense import FixedExpense
from app.expense.models.expense import Expense

###
# Serializers
###


class CreateFixedExpenseSerializer(serializers.ModelSerializer):
    expenses = serializers.PrimaryKeyRelatedField(
        queryset=Expense.objects.all(), many=True)

    def validate(self, attr):
        expenses_ids = self.initial_data.get('expenses', None)

        if expenses_ids is None:
            raise serializers.ValidationError()

        expenses = list(Expense.objects.filter(
            id__in=expenses_ids).values_list('id', flat=True))
        attr['expenses'] = set(expenses)
        return attr

    class Meta:
        model = FixedExpense
        fields = ["expenses", 'date', 'name', 'total_price', 'description',]
