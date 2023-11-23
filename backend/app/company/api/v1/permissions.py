"""
API V1: Address Permissions
"""
###
# Libs
###
from rest_framework import permissions
from app.company.models.company import Company


###
# Permissions
###

class IsCompanyOwner(permissions.BasePermission):
    """
    Allows access only to company owners.
    """

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.user_company.filter(company=obj, is_owner=True).exists():
            return True
        return False
