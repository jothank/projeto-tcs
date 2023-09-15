
"""
API V1: Company Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.company.models.company import Company
from app.accounts.models.user import User

###
# Serializers
###


class PartialUpdateCompanySerializer(serializers.ModelSerializer):

    users = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.all(),
    )

    def save(self, **kwargs):
        return super().save(**kwargs)

    class Meta:
        model = Company
        fields = ['users']
