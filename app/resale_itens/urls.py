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
    path('api/v1/', include('app.resale_itens.api.v1.urls'))
]
