"""
API V1: Resale Item Views
"""
###
# Libraries
###
from rest_framework import viewsets
from app.resale_item.models.resale_item import ResaleItem
from app.resale_item.api.v1.serializers.resale_item.default_serializer import DefaultResaleItemSerializer


###
# Viewsets
###
class ResaleItemViewSet(viewsets.ModelViewSet):
    queryset = ResaleItem.objects.all()
    serializer_class = DefaultResaleItemSerializer
