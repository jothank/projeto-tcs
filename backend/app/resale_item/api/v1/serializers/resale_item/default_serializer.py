"""
API V1: Resale Item Serializers
"""
###
# Libraries
###
from rest_framework import serializers

###
# Serializers
###


class DefaultResaleItemSerializer(serializers.Serializer):
    class Meta:
        fields = '__all__'
