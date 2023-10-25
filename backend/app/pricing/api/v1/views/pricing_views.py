"""
API V1: Pricing Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.pricing.models.pricing import Pricing
from app.pricing.api.v1.serializers.pricing.default import DefaultPricingSerializer


###
# Viewsets
###


class PricingViewSet(viewsets.ModelViewSet):
    queryset = Pricing.objects.all()
    serializer_class = DefaultPricingSerializer
