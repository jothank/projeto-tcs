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
class CreateFeedStockSerializer(serializers.ModelSerializer):
    unit = serializers.CharField(write_only=True)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['unit'] = UnitDefaultSerializer(instance.unit).data
        return ret

    class Meta:
        model = Feedstock
        fields = "__all__"
