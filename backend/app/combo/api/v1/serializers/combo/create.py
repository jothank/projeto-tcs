"""
API V1: Combo Serializers
"""
###
# Libraries
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

    def validate(self, attr):
        products_ids = self.initial_data.get('products', None)

        if products_ids is None:
            raise serializers.ValidationError()

        products = list(Product.objects.filter(
            id__in=products_ids).values_list('id', flat=True))
        attr['products'] = set(products)
        return attr

    class Meta:
        model = Combo
        fields = ["name", "products", "purchase_price"]
