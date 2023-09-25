"""
API V1: Combo Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.combo.models.combo import Combo
from app.product_registration.models.product_registration import ProductRegistration
from app.product_registration.api.v1.serializers.product_registration.retrieve import RetrieveProductRegistrationSerializer

###
# Serializers
###


class DefaultComboSerializer(serializers.ModelSerializer):
    registrations = RetrieveProductRegistrationSerializer(many=True)

    class Meta:
        model = Combo
        fields = ["id", "name", "registrations", "purchase_price"]
