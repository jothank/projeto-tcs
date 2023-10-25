"""
API V1: Product Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.product.models.product import Product
from app.product.api.v1.serializers.product.create import CreateProductSerializer
from app.product.api.v1.serializers.product.default import DefaultProductSerializer
from app.product.api.v1.serializers.product.retrieve import RetrieveProductSerializer
from app.product.api.v1.serializers.product.update import UpdateProductSerializer

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
        elif self.action == 'update':
            return UpdateProductSerializer
        else:
            return DefaultProductSerializer
