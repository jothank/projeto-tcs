"""
API V1: Combo Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.combo.models.combo import Combo
from app.product.models.product import Product

###
# Serializers
###


class CreateComboSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), many=True)
    price = serializers.FloatField(required=False)

    def validate(self, attr):
        product_ids = self.initial_data.get('products', None)

        if product_ids is None:
            raise serializers.ValidationError("Products must be provided.")

        products = Product.objects.filter(id__in=product_ids)
        attr['price'] = sum([product.price for product in products])
        attr['products'] = products
        return attr

    class Meta:
        model = Combo
        fields = ["name", "products", "price"]
