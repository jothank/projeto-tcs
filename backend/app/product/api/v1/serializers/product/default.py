"""
API V1: Product Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.product.models.product import Product

###
# Serializers
###


class DefaultProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
