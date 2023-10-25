"""
API V1: Product Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.product.models.product import Product
from app.supply.models.supply import Supply

###
# Serializers
###


class CreateProductSerializer(serializers.ModelSerializer):
    supplies = serializers.PrimaryKeyRelatedField(
        queryset=Supply.objects.all(), many=True)
    price = serializers.FloatField(required=False)

    def validate(self, attr):
        supplies_ids = self.initial_data.get('supplies', None)

        if supplies_ids is None:
            raise serializers.ValidationError()

        supplies = Supply.objects.filter(id__in=supplies_ids)
        attr['price'] = sum([supply.price for supply in supplies])
        attr['supplies'] = supplies
        return attr

    class Meta:
        model = Product
        fields = ["supplies", "price", "name",]
