from django_filters import rest_framework as filters
from app.feedstock.models.models import feedstock

class feedstockFilter(filters.FilterSet):
    
    class Meta:
        model = feedstock
        fields = {
            'name': ['icontains'],
            'quantity': ['icontains'],
            'units__abbreviation': ['exact'],
            'value': ['icontains'],
        }