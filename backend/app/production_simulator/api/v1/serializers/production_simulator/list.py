"""
API V1: ProductionSimulator Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.production_simulator.models.production_simulator import ProductionSimulator
from app.pricing.api.v1.serializers.pricing.list import ListPricingSerializer
###
# Serializers
###


class ListProductionSimulatorSerializer(serializers.ModelSerializer):
    pricing = ListPricingSerializer()

    class Meta:
        model = ProductionSimulator
        fields = '__all__'
        read_only_fields = ('user',)
