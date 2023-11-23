"""
API V1: Expense Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.cost.models.cost import Cost
from app.cost.api.v1.serializers.cost.default import DefaultCostSerializer
###
# Serializers
###


class CreateCostSerializer(serializers.Serializer):
    costs = DefaultCostSerializer(many=True)

    def create(self, validated_data):
        costs_data = validated_data['costs']
        user = self.context['request'].user
        for item in costs_data:
            item['user'] = user

        costs = Cost.objects.bulk_create(
            [Cost(**item) for item in costs_data])

        return {'costs': costs}
