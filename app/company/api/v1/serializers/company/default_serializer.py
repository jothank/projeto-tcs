"""
API V1: Company Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.company.models.company import Company

###
# Serializers
###


class DefaultCompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'
