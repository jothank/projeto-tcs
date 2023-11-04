from rest_framework import serializers
from app.cost.models.cost import Cost
from app.fixed_expense.models.fixed_expense import FixedExpense


class UpdateFixedExpenseSerializer(serializers.ModelSerializer):
    expenses = serializers.PrimaryKeyRelatedField(
        queryset=Cost.objects.all(), many=True, required=False)
    total_price = serializers.FloatField(required=False)

    def validate(self, attr):
        expenses_ids = self.initial_data.get('expenses', None)
        total_price = attr.get('total_price', None)

        if total_price is None and expenses_ids is None:
            raise serializers.ValidationError()

        if total_price is None and expenses_ids is not None:
            expenses = Cost.objects.filter(id__in=expenses_ids)
            attr['total_price'] = sum(expense.price for expense in expenses)

        return attr

    class Meta:
        model = FixedExpense
        fields = ["expenses", 'date', 'name', 'total_price', 'description',]
