"""
API V1: Combo Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.combo.models.combo import Combo
from app.combo.models.combo_product import ComboProduct
from app.product.models.product import Product


###
# Serializers
###


class UpdateComboSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), many=True, required=False
    )
    price = serializers.FloatField(required=False)

    def update(self, instance, validated_data):
        ComboProduct.objects.filter(combo=instance).delete()

        product_ids = self.initial_data.get('products', None)
        products = Product.objects.filter(id__in=product_ids)

        total_price = 0
        for product_id in product_ids:
            product = Product.objects.get(id=product_id)
            total_price += product.price
            ComboProduct.objects.create(combo=instance, product_id=product_id)

        # Atualizar o preço do combo
        instance.price = total_price
        instance.save(update_fields=['price'])

        return super().update(instance, validated_data)

    class Meta:
        model = Combo
        fields = ["name", "products", "price"]
