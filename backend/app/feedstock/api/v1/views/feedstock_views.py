"""
API V1: feedstock Views
"""
###
# Libraries
###
from rest_framework import viewsets
from app.feedstock.models.feedstock import feedstock
from app.feedstock.api.v1.serializers.feedstock.default import DefaultfeedstockSerializer
from app.feedstock.api.v1.serializers.feedstock.retrieve import RetrievefeedstockSerializer

###
# Viewsets
###


class feedstockViewSet(viewsets.ModelViewSet):
    queryset = feedstock.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrievefeedstockSerializer
        else:
            return DefaultfeedstockSerializer
