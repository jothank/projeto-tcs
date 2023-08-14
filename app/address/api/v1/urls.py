##
# Libraries
##
from django.urls import path, include
from rest_framework import routers
from app.address.api.v1.views.address_views import AddressViewSet


# Routers
router = routers.DefaultRouter()
router.register(r'address', AddressViewSet)

# URLs
urlpatterns = [
     path('', include(router.urls)),
  
]
