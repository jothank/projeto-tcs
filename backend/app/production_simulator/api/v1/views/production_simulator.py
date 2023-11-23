"""
API V1: ProductionSimulator Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.production_simulator.models.production_simulator import ProductionSimulator
from app.production_simulator.api.v1.serializers.production_simulator.default import DefaultProductionSimulatorSerializer
from app.production_simulator.api.v1.serializers.production_simulator.list import ListProductionSimulatorSerializer


###
# Viewsets
###


class ProductionSimulatorViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return user.productionsimulator_set.all().order_by('id')
        else:
            return ProductionSimulator.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def get_serializer_class(self):
        if self.action == 'list':
            return ListProductionSimulatorSerializer
        else:
            return DefaultProductionSimulatorSerializer
