"""
API V1: Pricing Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.pricing.models.pricing import Pricing
from app.pricing.api.v1.serializers.pricing.default import DefaultPricingSerializer
from app.pricing.api.v1.serializers.pricing.list import ListPricingSerializer


###
# Viewsets
###


class PricingViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return user.pricing_set.all().order_by('id')
        else:
            return Pricing.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def get_serializer_class(self):
        if self.action == 'list':
            return ListPricingSerializer
        else:
            return DefaultPricingSerializer
