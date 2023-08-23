from rest_framework import serializers
from app.feedstock.models.models import Feedstock
from app.utils.models.models import Unit

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = '__all__'

class FeedstockSerializer(serializers.ModelSerializer):
    units = UnitSerializer(many=True, read_only=True)

    class Meta:
        model = Feedstock
        fields = '__all__'
