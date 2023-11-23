###
# Libs
###
from django_filters import rest_framework as filters
from app.company.models.company import Company


###
# Filters
### 
class CompanyFilter(filters.FilterSet):
    name = filters.CharFilter(
        field_name='name', lookup_expr='icontains', method='filter_name')
    cnpj = filters.CharFilter(
        field_name='cnpj', lookup_expr='icontains', method='filter_cnpj')
    email = filters.CharFilter(
        field_name='email', lookup_expr='icontains', method='filter_email')
    phone = filters.CharFilter(
        field_name='phone', lookup_expr='icontains', method='filter_phone')
    zipcode = filters.CharFilter(
        field_name='zipcode', lookup_expr='icontains', method='filter_zipcode')
    street = filters.CharFilter(
        field_name='street', lookup_expr='icontains', method='filter_street')
    city = filters.CharFilter(
        field_name='city', lookup_expr='icontains', method='filter_city')
    state = filters.CharFilter(
        field_name='state', lookup_expr='exact', method='filter_state')
    country = filters.CharFilter(
        field_name='country', lookup_expr='exact', method='filter_country')

    def filter_name(self, queryset, name, value):
        return queryset.filter(name__icontains=value)

    def filter_cnpj(self, queryset, name, value):
        return queryset.filter(cnpj__icontains=value)

    def filter_email(self, queryset, name, value):
        return queryset.filter(email__icontains=value)

    def filter_phone(self, queryset, name, value):
        return queryset.filter(phone__icontains=value)

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
        model = Company
        fields = '__all__'
