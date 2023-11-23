###
# Libs
###
from rest_framework import serializers
from app.feedstock.models.feedstock import Feedstock
from rest_framework import serializers


###
# Serializers
###


class RetrieveFeedstockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feedstock
        fields = ('id', 'name', 'price', 'quantity', 'unit', 'type')
