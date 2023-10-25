###
# Libs
###
from rest_framework import serializers
from app.feedstock.models.feedstock import Feedstock
from rest_framework import serializers


###
# Serializers
###


class DefaultFeedstockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feedstock
        fields = "__all__"
