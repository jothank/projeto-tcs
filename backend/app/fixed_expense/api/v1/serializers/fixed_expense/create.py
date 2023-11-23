"""
API V1: Fixed Expense Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.fixed_expense.models.fixed_expense import FixedExpense
from app.cost.models.cost import Cost

###
# Serializers
###


class CreateFixedExpenseSerializer(serializers.ModelSerializer):
    costs = serializers.PrimaryKeyRelatedField(
        queryset=Cost.objects.all(), many=True, required=False)
    total_price = serializers.FloatField(required=False)

    def validate(self, attr):
        costs_ids = self.initial_data.get('costs', None)
        total_price = attr.get('total_price', None)

        if total_price is None and costs_ids is None:
            raise serializers.ValidationError()

        if total_price is None and costs_ids is not None:
            costs = Cost.objects.filter(id__in=costs_ids)
            attr['total_price'] = sum(cost.price for cost in costs)

        return attr

    class Meta:
        model = FixedExpense
        fields = ["costs", 'date', 'name', 'total_price', 'description', 'type',]
