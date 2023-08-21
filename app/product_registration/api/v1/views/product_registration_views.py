"""
API V1: Product Registration Views
"""
###
# Libraries
###
from django_filters import rest_framework as filters
from rest_framework import viewsets
from app.product_registration.models.product_registration import ProductRegistration
from django_filters.rest_framework import DjangoFilterBackend
from app.product_registration.api.v1.serializers.product_registration.default_serializer import ProductRegistrationSerializer
from app.product_registration.api.v1.filters.product_registration.product_registration_filter import ProductRegistrationFilter

###
# Viewsets
###

class ProductRegistrationViewSet(viewsets.ModelViewSet):
    queryset = ProductRegistration.objects.all()
    serializer_class = ProductRegistrationSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductRegistrationFilter