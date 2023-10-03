"""
API V1: Product Registration Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.product_registration.models.product_registration import ProductRegistration
from app.product.models.product import Product

###
# Serializers
###


class CreateProductRegistrationSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), many=True)

    def validate(self, attr):
        products_ids = self.initial_data.get('products', None)

        if products_ids is None:
            raise serializers.ValidationError()

        products = list(Product.objects.filter(
            id__in=products_ids).values_list('id', flat=True))
        attr['products'] = set(products)
        return attr

    class Meta:
        model = ProductRegistration
        fields = ["products", "producion_price", "name",]
