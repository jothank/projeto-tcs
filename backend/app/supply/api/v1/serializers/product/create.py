"""
API V1: Product Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.supply.models.product import Supply
from app.supply.api.v1.serializers.product.default import DefaultSupplySerializer

###
# Serializers
###


class CreateSupplySerializer(serializers.Serializer):

    supplies = DefaultSupplySerializer(many=True)

    def create(self, validated_data):
        supplies_data = validated_data['supplies']
        supplies = Supply.objects.bulk_create(
            [Supply(**item) for item in supplies_data])
        return {'supplies': supplies}
