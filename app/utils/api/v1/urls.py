from django.urls import path, include
from rest_framework import routers
from app.utils.api.v1.views.views import MassUnitList

# Routers
router = routers.SimpleRouter()
router.register(r'units', MassUnitList, basename='units')

# URLs
urlpatterns = [
    path('', include(router.urls)),
]