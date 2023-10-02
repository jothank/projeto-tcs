"""
API V1: Product Views
"""
###
# Libraries
###
from rest_framework import viewsets, status, response
from app.product.models.product import Product
from app.product.api.v1.serializers.product.default import DefaultProductSerializer
from app.product.api.v1.serializers.product.retrieve import RetrieveProductSerializer
from app.product.api.v1.serializers.product.create import CreateProductSerializer

###
# Viewsets
###


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveProductSerializer
        elif self.action == 'create':
            return CreateProductSerializer
        else:
            return DefaultProductSerializer
