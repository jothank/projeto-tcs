"""
API V1: Expense Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.cost.models.cost import Cost
from app.cost.api.v1.serializers.cost.default import DefaultCostSerializer
from app.cost.api.v1.serializers.cost.create import CreateCostSerializer


###
# Viewsets
###
class CostViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return user.cost_set.all().order_by('id')
        else:
            return Cost.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateCostSerializer
        else:
            return DefaultCostSerializer
