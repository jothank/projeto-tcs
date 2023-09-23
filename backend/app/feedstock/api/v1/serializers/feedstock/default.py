###
# Libraries
###
from rest_framework import serializers
from app.feedstock.models.feedstock import feedstock
from rest_framework import serializers


###
# Serializers
###


class DefaultfeedstockSerializer(serializers.ModelSerializer):

    class Meta:
        model = feedstock
        fields = '__all__'
