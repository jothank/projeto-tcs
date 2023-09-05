from rest_framework import serializers
from app.feedstock.models.models import Feedstock
from app.utils.models.models import Unit
from app.utils.api.v1.serializers.units.serializer import UnitSerializer

# class UnitIDListField(serializers.ListField):
#     child = serializers.IntegerField()

#     def to_internal_value(self, data):
#         if not isinstance(data, list):
#             raise serializers.ValidationError("Esperava uma lista de itens, mas recebi outra coisa.")

#         unit_ids = []
#         for item in data:
#             if not isinstance(item, int):
#                 raise serializers.ValidationError("Cada item na lista deve ser um número inteiro.")
#             unit_ids.append(item)

#         return unit_ids

class FeedstockSerializer(serializers.ModelSerializer):
    units = UnitSerializer(many=True, read_only=True)  

    class Meta:
        model = Feedstock
        fields = '__all__'

    def create(self, validated_data):
        units_data = validated_data.pop('units', [])  
        feedstock = super().create(validated_data)

        for unit_id in units_data:
            unit = Unit.objects.get(id=unit_id)
            feedstock.units.add(unit)

        return feedstock

    def update(self, instance, validated_data):
        units_data = validated_data.pop('units', [])  
        feedstock = super().update(instance, validated_data)
        
        feedstock.units.clear() 
        for unit_id in units_data:
            unit = Unit.objects.get(id=unit_id)
            feedstock.units.add(unit)

        return feedstock
