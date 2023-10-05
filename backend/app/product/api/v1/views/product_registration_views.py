"""
API V1: Product Registration Views
"""
###
# Libraries
###
from rest_framework import viewsets
from app.product.models.product_registration import Product
from app.product.api.v1.serializers.product_registration.create import CreateProductSerializer
from app.product.api.v1.serializers.product_registration.default import DefaultProductSerializer
from app.product.api.v1.serializers.product_registration.retrieve import RetrieveProductSerializer

###
# Viewsets
###


class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.order_by('id')

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveProductSerializer
        elif self.action == 'create':
            return CreateProductSerializer
        else:
            return DefaultProductSerializer
