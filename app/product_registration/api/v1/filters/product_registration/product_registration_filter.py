###
# Libraries
###

from django_filters import rest_framework as filters
from app.product_registration.models.product_registration import ProductRegistration


###
# Filters
###

class ProductRegistrationFilter(filters.FilterSet):
    product = filters.CharFilter(
        field_name='product', lookup_expr='icontains', method='filter_product')
    quantity = filters.NumberFilter(
        field_name='quantity', lookup_expr='exact', method='filter_quantity')
    unit_measure = filters.CharFilter(
        field_name='unit_measure', lookup_expr='exact', method='filter_unit_measure')
    percentage_loss = filters.NumberFilter(
        field_name='percentage_loss', lookup_expr='exact', method='filter_percentage_loss')
    
    def filter_product(self, queryset, name, value):
        return queryset.filter(product__icontains=value)
    def filter_quantity(self, queryset, name, value):
        return queryset.filter(quantity__exact=value)
    def filter_unit_measure(self, queryset, name, value):
        return queryset.filter(unit_measure__exact=value)
    def filter_percentage_loss(self, queryset, name, value):
        return queryset.filter(percentage_loss__exact=value)
    
    
    class Meta:
        model = ProductRegistration
        fields = '__all__'