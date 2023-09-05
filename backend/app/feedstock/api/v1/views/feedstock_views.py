"""
API V1: Feedstock Views
"""
###
# Libraries
###
from rest_framework import viewsets
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from app.feedstock.models.feedstock import Feedstock
from app.feedstock.api.v1.serializers.feedstock.default_serializer import DefaultFeedstockSerializer
from app.feedstock.api.v1.filters.feedstock.feedstock_filter import FeedstockFilter

###
# Viewsets
###
class FeedstockViewSet(viewsets.ModelViewSet):
    queryset = Feedstock.objects.all()
    serializer_class = DefaultFeedstockSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = FeedstockFilter
