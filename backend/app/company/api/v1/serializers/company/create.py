"""
API V1: Company Serializers
"""
###
# Libs
###
from rest_framework import serializers
from app.company.models.company import Company


###
# Serializers
###


class CreateCompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('name', 'cnpj', 'phone', 'email', 'street', 'number',
                  'neighborhood', 'city', 'state', 'country', 'zipcode',)
