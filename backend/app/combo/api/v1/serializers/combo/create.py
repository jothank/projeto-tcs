"""
API V1: Combo Serializers
"""
###
# Libraries
###
from rest_framework import serializers
from app.combo.models.combo import Combo
from app.product_registration.models.product_registration import ProductRegistration

###
# Serializers
###


class CreateComboSerializer(serializers.ModelSerializer):
    registrations = serializers.PrimaryKeyRelatedField(
        queryset=ProductRegistration.objects.all(), many=True)

    def validate(self, attr):
        registrations_ids = self.initial_data.get('registrations', None)

        if registrations_ids is None:
            raise serializers.ValidationError()

        registrations = list(ProductRegistration.objects.filter(
            id__in=registrations_ids).values_list('id', flat=True))
        attr['registrations'] = set(registrations)
        return attr

    class Meta:
        model = Combo
        fields = ["name", "registrations", "purchase_price"]
