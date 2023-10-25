"""
API V1: Combo Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.combo.models.combo import Combo
from app.product.models.product import Product
from app.product.api.v1.serializers.product.retrieve import RetrieveProductSerializer

###
# Serializers
###


class DefaultComboSerializer(serializers.ModelSerializer):
    products = RetrieveProductSerializer(many=True)

    class Meta:
        model = Combo
        fields = "__all__"
