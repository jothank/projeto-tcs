"""
API V1: Product Registration Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.product.models.product_registration import Product
###
# Serializers
###


class DefaultProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
