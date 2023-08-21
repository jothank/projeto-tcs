##
# Libraries
##
from django.urls import path, include
from rest_framework import routers
<<<<<<< HEAD:app/resale_itens/api/v1/urls.py
from app.company.api.v1.views.address_views import AddressViewSet

=======
from app.resale_item.api.v1.views.resale_item_views import ResaleItemViewSet
>>>>>>> ecf79495dc15a0411ca6821db988f0ab1637a919:app/product_specification/api/v1/urls.py

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
