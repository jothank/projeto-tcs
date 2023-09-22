from django_filters import rest_framework as django_filters
from app.utils.models.unit import Unit

class UnitFilter(django_filters.FilterSet):

    class Meta:
        model = Unit
        fields = '__all__'