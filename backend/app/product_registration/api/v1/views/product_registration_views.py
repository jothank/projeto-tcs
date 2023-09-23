"""
API V1: Product Registration Views
"""
###
# Libraries
###
from rest_framework import viewsets
from app.product_registration.models.product_registration import ProductRegistration
from app.product_registration.api.v1.serializers.product_registration.default_serializer import CreateProductRegistrationSerializer
from app.product_registration.api.v1.serializers.product_registration.retrieve import RetrieveProductRegistrationSerializer

###
# Viewsets
###


class ProductRegistrationViewSet(viewsets.ModelViewSet):

    queryset = ProductRegistration.objects.order_by('id')

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveProductRegistrationSerializer
        else:
            return CreateProductRegistrationSerializer
