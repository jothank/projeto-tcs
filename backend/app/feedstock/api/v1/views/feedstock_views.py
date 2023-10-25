"""
API V1: feedstock Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.feedstock.models.feedstock import Feedstock
from app.feedstock.api.v1.serializers.feedstock.default import DefaultFeedstockSerializer
from app.feedstock.api.v1.serializers.feedstock.retrieve import RetrieveFeedstockSerializer

###
# Viewsets
###


class FeedstockViewSet(viewsets.ModelViewSet):
    queryset = Feedstock.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveFeedstockSerializer
        else:
            return DefaultFeedstockSerializer
