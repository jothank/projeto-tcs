###
# Libraries
###
from rest_framework import serializers
from app.feedstock.models.feedstock import Feedstock
from rest_framework import serializers
from app.utils.models.unit import Unit


###
# Serializers
###


class DefaultFeedStockSerializer(serializers.ModelSerializer):
    medidas_massa = serializers.PrimaryKeyRelatedField(many=True, queryset=Unit.objects.all())

    class Meta:
        model = Feedstock
        fields = '__all__'