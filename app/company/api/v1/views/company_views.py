"""
API V1: Address Views
"""
###
# Libraries
###
from rest_framework import viewsets
from django_filters import rest_framework as filters
from app.company.models.company import Address
from django_filters.rest_framework import DjangoFilterBackend
from app.company.api.v1.serializers.company.default_serializer import DefaultCompanySerializer
from app.company.api.v1.filters.company.company_filter import CompanyFilter


###
# Viewsets
###
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = DefaultCompanySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CompanyFilter
   
