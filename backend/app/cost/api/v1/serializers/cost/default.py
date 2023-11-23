"""
API V1: Fixed Expense Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.cost.models.cost import Cost
###
# Serializers
###


class DefaultCostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cost
        read_only_fields = ('user',)
        fields = '__all__'
