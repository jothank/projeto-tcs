##
# Libraries
##
from django.urls import path, include
from rest_framework import routers
from app.company.api.v1.views.address_views import AddressViewSet


# Routers
router = routers.SimpleRouter()
router.register(r'address', AddressViewSet, basename='address')

# URLs
urlpatterns = [
    path('', include(router.urls)),
]
