"""
API V1: Fixed Expense Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.expense.models.expense import Expense
###
# Serializers
###


class DefaultExpenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expense
        fields = '__all__'
