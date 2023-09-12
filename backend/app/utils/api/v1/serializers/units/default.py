from rest_framework import serializers
from app.utils.models.unit import Unit

class UnitDefaultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = '__all__'
