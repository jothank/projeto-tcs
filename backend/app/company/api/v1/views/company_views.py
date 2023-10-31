"""
API V1: Company Views
"""
###
# Libs
###
from rest_framework import viewsets, permissions
from app.company.api.v1.serializers.company.default_serializer import DefaultCompanySerializer
from app.company.api.v1.serializers.company.create import CreateCompanySerializer
from app.company.api.v1.serializers.company.partial_update import PartialUpdateCompanySerializer
from app.company.models.company_user import CompanyUser
from app.company.api.v1.permissions import IsCompanyOwner

###
# Viewsets
###


class CompanyViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            return user.companies.all()
        else:
            return CompanyUser.objects.none()

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateCompanySerializer
        elif self.action == 'partial_update':
            return PartialUpdateCompanySerializer
        else:
            return DefaultCompanySerializer

    def get_permissions(self):
        if self.action == 'partial_update':
            return (permissions.IsAuthenticated(), IsCompanyOwner())
        else:
            return (permissions.IsAuthenticated(),)

    def perform_create(self, serializer):
        user = self.request.user
        company = serializer.save()
        CompanyUser.objects.create(
            user=user,
            company=company,
            is_owner=True
        )
