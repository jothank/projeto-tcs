from rest_framework import serializers
from app.expense.models.expense import Expense
from app.fixed_expense.models.fixed_expense import FixedExpense


class UpdateFixedExpenseSerializer(serializers.ModelSerializer):
    expenses = serializers.PrimaryKeyRelatedField(
        queryset=Expense.objects.all(), many=True, required=False)
    total_price = serializers.FloatField(required=False)

    def validate(self, attr):
        expenses_ids = self.initial_data.get('expenses', None)

        if expenses_ids is None:
            raise serializers.ValidationError()

        expenses = list(Expense.objects.filter(
            id__in=expenses_ids).values_list('id', flat=True))
        attr['expenses'] = set(expenses)
        attr['total_price'] = sum([expense.price for expense in expenses])
        return attr

    class Meta:
        model = FixedExpense
        fields = ["id", "expenses", 'date',
                  'name', 'total_price', 'description',]
