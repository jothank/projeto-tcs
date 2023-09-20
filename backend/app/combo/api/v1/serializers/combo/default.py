"""
API V1: Combo Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.combo.models.combo import Combo

###
# Serializers
###


class DefaultComboSerializer(serializers.ModelSerializer):

    class Meta:
        model = Combo
        fields = '__all__'
