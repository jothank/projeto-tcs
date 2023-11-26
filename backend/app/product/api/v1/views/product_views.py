"""
API V1: Product Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.product.models.product import Product
from app.product.models.product_supply import ProductSupply
from app.product.api.v1.serializers.product.create import CreateProductSerializer
from app.product.api.v1.serializers.product.default import DefaultProductSerializer
from app.product.api.v1.serializers.product.retrieve import RetrieveProductSerializer
from app.product.api.v1.serializers.product.update import UpdateProductSerializer

###
# Viewsets
###


class ProductViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            return user.product_set.all().order_by('id')

        else:
            return Product.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)


    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveProductSerializer
        elif self.action == 'create':
            return CreateProductSerializer
        elif self.action in ['update', 'partial_update']:
            return UpdateProductSerializer
        else:
            return DefaultProductSerializer
