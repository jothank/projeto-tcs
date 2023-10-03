###
# Libraries
###
from rest_framework import serializers
from app.fixed_expense.models.fixed_expense import FixedExpense
from app.expense.api.v1.serializers.expense.default import DefaultExpenseSerializer

###
# Serializers
###


class RetrieveFixedExpenseSerializer(serializers.ModelSerializer):
    expenses = DefaultExpenseSerializer(many=True)

    class Meta:
        model = FixedExpense
        fields = "__all__"
