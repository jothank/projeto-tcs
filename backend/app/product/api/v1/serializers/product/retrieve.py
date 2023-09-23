"""
API V1: Product Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.product.models.product import Product
from app.feedstock.api.v1.serializers.feedstock.default import DefaultfeedstockSerializer

###
# Serializers
###


class RetrieveProductSerializer(serializers.ModelSerializer):
    feedstock = DefaultfeedstockSerializer()

    class Meta:
        model = Product
        fields = ('id', 'feedstock', 'quantity', 'unit', 'price')
