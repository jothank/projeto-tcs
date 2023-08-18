##
# Libraries
##
from django.urls import path, include
from rest_framework import routers
from app.resale_item.api.v1.views.resale_item_views import ResaleItemViewSet

# Routers
router = routers.SimpleRouter()
router.register(
    r'resale_item',
    ResaleItemViewSet,
    basename='resale_item'
)

# URLs
urlpatterns = [
    path('', include(router.urls)),
]
