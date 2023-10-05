"""
API V1: Product Registration Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.product.models.product_registration import Product
from app.supply.models.product import Supply

###
# Serializers
###


class CreateProductSerializer(serializers.ModelSerializer):
    supplies = serializers.PrimaryKeyRelatedField(
        queryset=Supply.objects.all(), many=True)

    def validate(self, attr):
        supplies_ids = self.initial_data.get('supplies', None)

        if supplies_ids is None:
            raise serializers.ValidationError()

        supplies = list(Supply.objects.filter(
            id__in=supplies_ids).values_list('id', flat=True))
        attr['supplies'] = set(supplies)
        return attr

    class Meta:
        model = Product
        fields = ["supplies", "price", "name",]
