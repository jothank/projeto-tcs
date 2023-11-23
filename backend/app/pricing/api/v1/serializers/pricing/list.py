"""
API V1: Pricing Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.pricing.models.pricing import Pricing
from app.product.api.v1.serializers.product.default import DefaultProductSerializer
from app.combo.api.v1.serializers.combo.default import DefaultComboSerializer
###
# Serializers
###


class ListPricingSerializer(serializers.ModelSerializer):
    product = DefaultProductSerializer()
    combo = DefaultComboSerializer()

    class Meta:
        model = Pricing
        fields = '__all__'
        read_only_fields = ('user',)
