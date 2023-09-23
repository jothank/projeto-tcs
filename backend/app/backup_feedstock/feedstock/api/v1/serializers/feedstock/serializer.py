from rest_framework import serializers
from app.feedstock.models.models import feedstock
from app.utils.models.models import Unit
from app.utils.api.v1.serializers.units.serializer import UnitSerializer
from rest_framework import serializers


class CustomUnitSerializer(UnitSerializer):
    class Meta:
        model = Unit
        fields = ('id', 'abbreviation', 'full_name', 'value_in_base_unit')
        extra_kwargs = {
            'id': {'required': True},
            'abbreviation': {'required': True},
            'full_name': {'required': True},
            'value_in_base_unit': {'required': True}
        }

class feedstockSerializer(serializers.ModelSerializer):
    units = CustomUnitSerializer(many=True, read_only=True)

    class Meta:
        model = feedstock
        fields = '__all__'
