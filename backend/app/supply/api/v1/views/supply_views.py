"""
API V1: Product Views
"""
###
# Libraries
###
from rest_framework import viewsets, status
from rest_framework.response import Response
from app.supply.models.supply import Supply
from app.supply.api.v1.serializers.supply.default import DefaultSupplySerializer
from app.supply.api.v1.serializers.supply.retrieve import RetrieveSupplySerializer
from app.supply.api.v1.serializers.supply.create import CreateSupplySerializer

###
# Viewsets
###


class SupplyViewSet(viewsets.ModelViewSet):
    queryset = Supply.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveSupplySerializer
        elif self.action == 'create':
            return CreateSupplySerializer
        else:
            return DefaultSupplySerializer
