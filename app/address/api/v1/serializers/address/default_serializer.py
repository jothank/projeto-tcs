"""
API V1: Address Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.address.models.address import Address

###
# Serializers
###


class DefaultAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'
