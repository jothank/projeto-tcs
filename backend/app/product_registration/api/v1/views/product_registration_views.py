"""
API V1: Product Registration Views
"""
###
# Libraries
###
from rest_framework import viewsets
from app.product_registration.models.product_registration import ProductRegistration
from app.product_registration.api.v1.serializers.product_registration.default_serializer import ProductRegistrationSerializer

###
# Viewsets
###


class ProductRegistrationViewSet(viewsets.ModelViewSet):
    queryset = ProductRegistration.objects.all()
    serializer_class = ProductRegistrationSerializer
