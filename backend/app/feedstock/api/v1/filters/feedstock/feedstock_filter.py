from django_filters import rest_framework as filters
from app.feedstock.models.feedstock import feedstock

class feedstockFilter(filters.FilterSet):

    class Meta:
        model = feedstock
        fields = '__all__'