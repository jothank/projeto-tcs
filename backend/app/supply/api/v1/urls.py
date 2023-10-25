##
# Libs
##
from django.urls import path, include
from rest_framework import routers
from app.supply.api.v1.views.supply_views import SupplyViewSet


###
# Routers
###
router = routers.SimpleRouter()
router.register(r'supply', SupplyViewSet, basename='supply')

###
# URLs
###
urlpatterns = [
    path('', include(router.urls)),
]
