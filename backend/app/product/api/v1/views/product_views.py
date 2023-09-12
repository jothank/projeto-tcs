"""
API V1: Product Views
"""
###
# Libraries
###
from rest_framework import viewsets
from django_filters import rest_framework as filters
from app.product.models.product import Product
from app.product.api.v1.serializers.product.default import DefaultProductSerializer
from rest_framework.pagination import PageNumberPagination  



###
# Viewsets
###

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
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = DefaultProductSerializer
    pagination_class = CustomPagination  