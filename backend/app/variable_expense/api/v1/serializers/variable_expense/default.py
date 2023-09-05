"""
API V1: Variable Expense Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.variable_expense.models.variable_expense import VariableExpense

###
# Serializers
###


class DefaultVariableExpenseSerializer(serializers.Serializer):
    class Meta:
        model = VariableExpense
        fields = '__all__'
