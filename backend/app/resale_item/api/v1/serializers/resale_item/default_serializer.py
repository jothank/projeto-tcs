"""
API V1: Resale Item Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.resale_item.models.resale_item import ResaleItem

###
# Serializers
###


class DefaultResaleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResaleItem
        fields = '__all__'
