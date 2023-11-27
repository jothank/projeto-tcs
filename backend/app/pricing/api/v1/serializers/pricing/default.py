"""
API V1: Pricing Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.pricing.models.pricing import Pricing
###
# Serializers
###


class DefaultPricingSerializer(serializers.ModelSerializer):
    suggested_price = serializers.FloatField(
        required=False,
    )

    class Meta:
        model = Pricing
        fields = '__all__'
        read_only_fields = ('user',)
