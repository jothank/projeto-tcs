"""
API V1: Fixed Expense Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.expense.models.expense import Expense
###
# Serializers
###


class DefaultExpenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expense
        read_only_fields = ('user',)
        fields = '__all__'
