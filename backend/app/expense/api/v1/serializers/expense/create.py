"""
API V1: Expense Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.expense.models.expense import Expense
from app.expense.api.v1.serializers.expense.default import DefaultExpenseSerializer as ExpenseSerializer
###
# Serializers
###


class CreateExpenseSerializer(serializers.Serializer):

    expenses = ExpenseSerializer(many=True)

    def create(self, validated_data):
        expenses_data = validated_data['expenses']
        expenses = Expense.objects.bulk_create(
            [Expense(**item) for item in expenses_data])
        return {'expenses': expenses}
