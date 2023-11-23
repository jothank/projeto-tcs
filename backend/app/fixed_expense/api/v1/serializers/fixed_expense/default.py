"""
API V1: Fixed Expense Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.fixed_expense.models.fixed_expense import FixedExpense
###
# Serializers
###


class DefaultFixedExpenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = FixedExpense
        fields = '__all__'
