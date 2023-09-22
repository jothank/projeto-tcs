"""
API V1: Pricing Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.pricing.models.pricing import Pricing
###
# Serializers
###


class DefaultPricingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pricing
        fields = '__all__'
