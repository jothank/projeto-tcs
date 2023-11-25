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

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            return user.feedstock_set.all().order_by('id')
        else:
            return Feedstock.objects.none()

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveFeedstockSerializer
        else:
            return DefaultFeedstockSerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)
