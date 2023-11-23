"""
API V1: Supply Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.supply.models.supply import Supply
from app.supply.helpers.supply import calculate_price
from app.supply.api.v1.serializers.supply.default import DefaultSupplySerializer


###
# Serializers
###


class CreateSupplySerializer(serializers.Serializer):
    supplies = DefaultSupplySerializer(many=True)

    def create(self, validated_data):
        supplies_data = validated_data['supplies']
        user = self.context['request'].user

        for item in supplies_data:
            feedstock = item['feedstock']
            calculated_price = calculate_price(
                feedstock.price,
                feedstock.quantity,
                feedstock.unit,
                item['quantity'],
                item['unit']
            )
            item['price'] = calculated_price
            item['user'] = user

        supplies = Supply.objects.bulk_create(
            [Supply(**item) for item in supplies_data])

        return {'supplies': supplies}
