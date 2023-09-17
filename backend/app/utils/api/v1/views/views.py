from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination  
from django_filters import rest_framework as filters
from app.utils.models.unit import Unit
from app.utils.api.v1.serializers.units.default import UnitDefaultSerializer
from app.utils.api.v1.filters.units.filters import UnitFilter
from rest_framework.response import Response

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

class MassUnitList(viewsets.ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = UnitDefaultSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = UnitFilter
    pagination_class = CustomPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
