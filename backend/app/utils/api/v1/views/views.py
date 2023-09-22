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
    
    def get_queryset(self):
        return Unit.objects.order_by('nome')