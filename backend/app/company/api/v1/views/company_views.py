"""
API V1: Company Views
"""
###
# Libraries
###
from rest_framework import viewsets, permissions
from app.company.models.company import Company
from app.company.api.v1.serializers.company.default_serializer import DefaultCompanySerializer
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
    
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = DefaultCompanySerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = CustomPagination  
