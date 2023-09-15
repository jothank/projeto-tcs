"""
API V1: Company Views
"""
###
# Libraries
###
from rest_framework import viewsets, permissions
from app.company.models.company import Company
from app.company.api.v1.serializers.company.default_serializer import DefaultCompanySerializer
from app.company.api.v1.serializers.company.create import CreateCompanySerializer
from app.company.api.v1.serializers.company.partial_update import PartialUpdateCompanySerializer


###
# Viewsets
###
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateCompanySerializer
        elif self.action == 'partial_update':
            return PartialUpdateCompanySerializer
        else:
            return DefaultCompanySerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(owner=user)
