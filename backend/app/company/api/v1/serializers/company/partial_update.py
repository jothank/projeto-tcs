"""
API V1: Company Serializers
"""
###
# Libs
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

    def update(self, instance, validated_data):
        users = validated_data.pop('users')
        for user in users:
            if not (instance.users.filter(id=user.id).exists()):
                instance.users.add(user)
                continue
        instance = super().update(instance, validated_data)
        return instance

    class Meta:
        model = Company
        fields = ['users']
