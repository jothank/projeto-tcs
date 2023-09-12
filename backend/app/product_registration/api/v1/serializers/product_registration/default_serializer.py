"""
API V1: Product Registration Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.product_registration.models.product_registration import ProductRegistration

###
# Serializers
###

class ProductRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductRegistration
        fields = '__all__'