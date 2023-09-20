"""
ResaleItens URL Configuration
"""
###
# Libraries
###
from django.urls import path, include


###
# URL Patterns
###


urlpatterns = [
    path('', include('app.resale_item.api.v1.urls'))
]
