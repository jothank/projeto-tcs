"""
API V1: ProductionSimulator Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.production_simulator.models.production_simulator import ProductionSimulator
###
# Serializers
###


class DefaultProductionSimulatorSerializer(serializers.ModelSerializer):
    amortization = serializers.FloatField(required=False)

    class Meta:
        model = ProductionSimulator
        fields = '__all__'
        read_only_fields = ('user',)
