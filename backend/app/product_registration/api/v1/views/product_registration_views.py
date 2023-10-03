"""
API V1: Product Registration Views
"""
###
# Libraries
###
from rest_framework import viewsets
from app.product_registration.models.product_registration import ProductRegistration
from app.product_registration.api.v1.serializers.product_registration.create import CreateProductRegistrationSerializer
from app.product_registration.api.v1.serializers.product_registration.retrieve import RetrieveProductRegistrationSerializer
from app.product_registration.api.v1.serializers.product_registration.default import DefaultProductRegistrationSerializer

###
# Viewsets
###


class ProductRegistrationViewSet(viewsets.ModelViewSet):

    queryset = ProductRegistration.objects.order_by('id')

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveProductRegistrationSerializer
        elif self.action == 'create':
            return CreateProductRegistrationSerializer
        else:
            return DefaultProductRegistrationSerializer
