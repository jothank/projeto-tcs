"""
API V1: Feedstock Views
"""
###
# Libraries
###
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as filters
from app.feedstock.models.feedstock import Feedstock
from app.feedstock.api.v1.serializers.feedstock.default import DefaultFeedStockSerializer
from app.feedstock.api.v1.filters.feedstock.feedstock_filter import FeedstockFilter
###
# Viewsets
###


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    null_page = False

    def get_next_link(self):
        if not self.page.has_next():
            return 0
        return super().get_next_link()

    def get_previous_link(self):
        if not self.page.has_previous():
            return 0
        return super().get_previous_link()


class FeedstockViewSet(viewsets.ModelViewSet):
    queryset = Feedstock.objects.all()
    filter_backends = [filters.DjangoFilterBackend]
    # filterset_class = FeedstockFilter
    # pagination_class = CustomPagination
    serializer_class = DefaultFeedStockSerializer
