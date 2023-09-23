###
# Libraries
###
from rest_framework import serializers
from app.product_registration.models.product_registration import ProductRegistration
from app.product.api.v1.serializers.product.retrieve import RetrieveProductSerializer
from app.feedstock.api.v1.serializers.feedstock.default import DefaultfeedstockSerializer

###
# Serializers
###


class RetrieveProductRegistrationSerializer(serializers.ModelSerializer):
    products = RetrieveProductSerializer(many=True)
    feedstock = DefaultfeedstockSerializer(
        source='products.feedstock', read_only=True)

    class Meta:
        model = ProductRegistration
        fields = "__all__"
