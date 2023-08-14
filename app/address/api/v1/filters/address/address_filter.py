from django_filters import rest_framework as filters
from app.address.models.address import Address

class AddressFilter(filters.FilterSet):

    zipcode = filters.CharFilter(field_name='zipcode', lookup_expr='icontains', method='filter_zipcode')
    street = filters.CharFilter(field_name='street', lookup_expr='icontains', method='filter_street')
    city = filters.CharFilter(field_name='city', lookup_expr='icontains', method='filter_city')
    state = filters.CharFilter(field_name='state', lookup_expr='exact', method='filter_state')
    country = filters.CharFilter(field_name='country', lookup_expr='exact', method='filter_country')

    def filter_zipcode(self, queryset, name, value):
        return queryset.filter(zipcode__icontains=value)
    
    def filter_street(self, queryset, name, value):
        return queryset.filter(street__icontains=value)

    def filter_city(self, queryset, name, value):
        return queryset.filter(city__icontains=value)

    def filter_state(self, queryset, name, value):
        return queryset.filter(state=value)

    def filter_country(self, queryset, name, value):
        return queryset.filter(country=value)
    class Meta:
        model = Address
        fields = '__all__'
       