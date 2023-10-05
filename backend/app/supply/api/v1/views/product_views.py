"""
API V1: Product Views
"""
###
# Libraries
###
from rest_framework import viewsets
from app.supply.models.product import Supply
from app.supply.api.v1.serializers.product.default import DefaultSupplySerializer
from app.supply.api.v1.serializers.product.retrieve import RetrieveSupplySerializer
from app.supply.api.v1.serializers.product.create import CreateSupplySerializer

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
