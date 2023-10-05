"""
API V1: Product Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.supply.models.product import Supply
from app.feedstock.api.v1.serializers.feedstock.default import DefaultFeedstockSerializer

###
# Serializers
###


class RetrieveSupplySerializer(serializers.ModelSerializer):
    feedstock = DefaultFeedstockSerializer()

    class Meta:
        model = Supply
        fields = ('id', 'feedstock', 'quantity', 'unit', 'price')
