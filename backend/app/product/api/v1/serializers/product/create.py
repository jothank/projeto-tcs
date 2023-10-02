"""
API V1: Product Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.product.models.product import Product
from app.product.api.v1.serializers.product.default import DefaultProductSerializer as ProductSerializer

###
# Serializers
###


class CreateProductSerializer(serializers.Serializer):

    products = ProductSerializer(many=True)

    def create(self, validated_data):
        products_data = validated_data['products']
        products = Product.objects.bulk_create(
            [Product(**item) for item in products_data])
        return {'products': products}
