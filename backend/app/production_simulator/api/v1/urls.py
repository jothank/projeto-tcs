##
# Libs
##
from django.urls import path, include
from rest_framework import routers
from app.production_simulator.api.v1.views.production_simulator import ProductionSimulatorViewSet


###
# Routers
###
router = routers.SimpleRouter()
router.register(r'production_simulator',
                ProductionSimulatorViewSet, basename='pricing')

###
# URLs
###
urlpatterns = [
    path('', include(router.urls)),
]
