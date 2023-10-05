"""
API V1: Combo Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.combo.models.combo import Combo
from app.product.models.product_registration import Product
from app.product.api.v1.serializers.product_registration.retrieve import RetrieveProductSerializer

###
# Serializers
###


class DefaultComboSerializer(serializers.ModelSerializer):
    products = RetrieveProductSerializer(many=True)

    class Meta:
        model = Combo
        fields = ["id", "name", "products", "purchase_price"]
