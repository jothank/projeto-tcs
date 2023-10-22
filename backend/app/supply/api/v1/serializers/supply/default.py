"""
API V1: Product Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.supply.models.supply import Supply

###
# Serializers
###


class DefaultSupplySerializer(serializers.ModelSerializer):
    price = serializers.FloatField(required=False)

    class Meta:
        model = Supply
        fields = '__all__'
