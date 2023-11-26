"""
API V1: Supply Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.supply.models.supply import Supply
from app.supply.api.v1.serializers.supply.default import DefaultSupplySerializer
from app.supply.api.v1.serializers.supply.retrieve import RetrieveSupplySerializer
from app.supply.api.v1.serializers.supply.create import CreateSupplySerializer

###
# Viewsets
###


class SupplyViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return user.supply_set.all().order_by('id')
        else:
            return Supply.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveSupplySerializer
        elif self.action == 'create':
            return CreateSupplySerializer
        else:
            return DefaultSupplySerializer
