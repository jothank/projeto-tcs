##
# Libraries
##
from django.urls import path, include
from rest_framework import routers
from api.v1.views import AddressViewSet


# Routers
router = routers.DefaultRouter()
router.register(r'addresses', AddressViewSet)

# URLs
urlpatterns = [
     path('', include(router.urls)),
  
]
