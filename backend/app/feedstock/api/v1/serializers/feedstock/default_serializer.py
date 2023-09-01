"""
API V1: Feedstock Serializers
"""
###
# Libraries
###

from rest_framework import serializers
from app.feedstock.models.feedstock import Feedstock

###
# Serializers
###

class DefaultFeedstockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedstock
        fields = '__all__'