###
# Libs
###
from rest_framework import serializers
from app.product.models.product import Product
from app.supply.api.v1.serializers.supply.retrieve import RetrieveSupplySerializer
from app.feedstock.api.v1.serializers.feedstock.default import DefaultFeedstockSerializer

###
# Serializers
###


class RetrieveProductSerializer(serializers.ModelSerializer):
    supplies = RetrieveSupplySerializer(many=True)
    feedstock = DefaultFeedstockSerializer(
        source='supplies.feedstock', read_only=True)

    class Meta:
        model = Product
        fields = "__all__"
