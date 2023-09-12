from django_filters import rest_framework as filters
from app.feedstock.models.feedstock import Feedstock

class FeedstockFilter(filters.FilterSet):
    
    class Meta:
        model = Feedstock
        fields = {
            'name': ['icontains'],
            'quantity': ['icontains'],
            'units__abbreviation': ['exact'],
            'value': ['icontains'],
        }