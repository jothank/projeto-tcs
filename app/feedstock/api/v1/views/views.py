from rest_framework import viewsets, status
from rest_framework.pagination import PageNumberPagination  
from rest_framework.response import Response
from django_filters import rest_framework as filters
from app.feedstock.models.models import Feedstock
from app.feedstock.api.v1.serializers.feedstock.serializer import FeedstockSerializer
from app.feedstock.api.v1.filters.feedstock.filters import FeedstockFilter
from app.utils.api.v1.serializers.units.serializer import UnitSerializer
from app.utils.models.models import Unit

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
    serializer_class = FeedstockSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = FeedstockFilter
    pagination_class = CustomPagination  

    def create(self, request, *args, **kwargs):
        units_data = request.data.get('units') 
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        feedstock = serializer.save()

        for unit_id in units_data:
            unit = Unit.objects.get(id=unit_id)
            feedstock.units.add(unit)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        units_data = request.data.get('units', []) 
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        feedstock = serializer.save()

        feedstock.units.clear() 
        for unit_id in units_data:
            unit = Unit.objects.get(id=unit_id)
            feedstock.units.add(unit)
            
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)  
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)  
        return Response(serializer.data)