##
# Libs
##
from django.urls import path, include
from rest_framework import routers
from app.cost.api.v1.views.cost_views import CostViewSet


###
# Routers
###
router = routers.SimpleRouter()
router.register(
    r'cost',
    CostViewSet,
    basename='cost'
)

###
# URLs
###
urlpatterns = [
    path('', include(router.urls)),
]
