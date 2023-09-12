###
# Libraries
###
from rest_framework import serializers
from app.feedstock.models.feedstock import Feedstock
from app.utils.models.unit import Unit
from app.utils.api.v1.serializers.units.default import UnitDefaultSerializer
from rest_framework import serializers


###
# Serializers
###


class DefaultFeedStockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feedstock
        fields = '__all__'
