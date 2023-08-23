from django_filters import rest_framework as django_filters
from app.utils.models.models import Unit

class UnitFilter(django_filters.FilterSet):

    class Meta:
        model = Unit
        fields = {
            'abbreviation': ['icontains'],
            'full_name': ['icontains'],
            'value_in_base_unit': ['icontains'],
        }