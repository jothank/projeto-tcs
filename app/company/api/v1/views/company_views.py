"""
API V1: Company Views
"""
###
# Libraries
###
from rest_framework import viewsets, permissions
from app.company.models.company import Company
from app.company.api.v1.serializers.company.default_serializer import DefaultCompanySerializer


###
# Viewsets
###
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = DefaultCompanySerializer
    permission_classes = (permissions.IsAuthenticated,)
