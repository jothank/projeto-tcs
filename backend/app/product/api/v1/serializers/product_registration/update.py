###
# Libraries
###
from rest_framework import serializers
from app.product.models.product_registration import Product
from app.supply.models.product import Supply

###
# Serializers
###

class UpdateProductSerializer(serializers.ModelSerializer):
    supplies = serializers.PrimaryKeyRelatedField(
        queryset=Supply.objects.all(), many=True)

    def validate(self, attr):
        if 'supplies' in self.initial_data:
            supplies_ids = self.initial_data.get('supplies')
            if not supplies_ids:
                raise serializers.ValidationError("Supplies cannot be empty.")
            supplies = list(Supply.objects.filter(
                id__in=supplies_ids).values_list('id', flat=True))
            attr['supplies'] = set(supplies)

        return attr

    class Meta:
        model = Product
        fields = ["id","supplies", "price", "name"]
