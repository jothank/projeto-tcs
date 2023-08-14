from rest_framework import serializers
from app.address.models.address import Address


class DefaultAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'