from django_filters import rest_framework as filters
from app.feedstock.models.feedstock import Feedstock

class FeedstockFilter(filters.FilterSet):
    
    unique_key = filters.CharFilter(field_name='unique_key', lookup_expr='icontains', method='filter_unique_key')
    
    value = filters.CharFilter(field_name='value', lookup_expr='icontains', method='value')
    
    mass = filters.CharFilter(field_name='mass', lookup_expr='icontains', method='mass')
    
    def filter_unique_key(self, queryset, name, value):
        return queryset.filter(unique_key__icontains=value)
    
    def value(self, queryset, name, value):
        return queryset.filter(value__icontains=value)
    
    def mass(self, queryset, name, value):
        return queryset.filter(mass__icontains=value)
    
    class Meta:
        model = Feedstock
        fields = '__all__'
        