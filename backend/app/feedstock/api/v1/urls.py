##
# Libraries
##
from django.urls import path, include
from rest_framework import routers
from app.feedstock.api.v1.views.feedstock_views import feedstockViewSet

# Routers
router = routers.SimpleRouter()
router.register(r'feedstock', feedstockViewSet, basename='feedstock')

# URLs
urlpatterns = [
    path('', include(router.urls)),
]