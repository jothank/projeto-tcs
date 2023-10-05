"""
API V1: Product Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.supply.models.product import Supply

###
# Serializers
###


class DefaultSupplySerializer(serializers.ModelSerializer):

    class Meta:
        model = Supply
        fields = '__all__'
