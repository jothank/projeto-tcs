"""
API V1: Product Registration Views
"""
###
# Libraries
###
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from decimal import Decimal
from rest_framework import viewsets
from app.product_registration.models.product_registration import ProductRegistration
from app.product_registration.api.v1.serializers.product_registration.default_serializer import ProductRegistrationSerializer
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
    
class ProductRegistrationViewSet(viewsets.ModelViewSet):
    queryset = ProductRegistration.objects.all()
    serializer_class = ProductRegistrationSerializer
    pagination_class = CustomPagination  
    
    
