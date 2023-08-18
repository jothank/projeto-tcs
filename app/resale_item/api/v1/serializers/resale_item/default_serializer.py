###
# Librairies
##
from rest_framework import serializers

###
# Serializers
###


class DefaultResaleItemSerializer(serializers.Serializer):
    class Meta:
        fields = '__all__'
