###
# Libs
###
from rest_framework import serializers
from app.fixed_expense.models.fixed_expense import FixedExpense
from app.cost.api.v1.serializers.cost.default import DefaultCostSerializer

###
# Serializers
###


class RetrieveFixedExpenseSerializer(serializers.ModelSerializer):
    expenses = DefaultCostSerializer(many=True)

    class Meta:
        model = FixedExpense
        fields = "__all__"
