##
# Libraries
##
from django.urls import path, include
from rest_framework import routers
from app.product.api.v1.views.product_views import ProductViewSet


# Routers
router = routers.SimpleRouter()
router.register(r'address', ProductViewSet, basename='address')

# URLs
urlpatterns = [
    path('', include(router.urls)),
]
