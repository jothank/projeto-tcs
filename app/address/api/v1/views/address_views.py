from rest_framework import viewsets
from django_filters import rest_framework as filters
from app.address.models.address import Address
from django_filters.rest_framework import DjangoFilterBackend
from app.address.api.v1.serializers.address.default_serializer import DefaultAddressSerializer
from app.address.api.v1.filters.address.address_filter import AddressFilter

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = DefaultAddressSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AddressFilter
    serializer_class = DefaultAddressSerializer
