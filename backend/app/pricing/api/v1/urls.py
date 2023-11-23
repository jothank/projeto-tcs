##
# Libs
##
from django.urls import path, include
from rest_framework import routers
from app.pricing.api.v1.views.pricing_views import PricingViewSet


###
# Routers
###
router = routers.SimpleRouter()
router.register(r'pricing', PricingViewSet, basename='pricing')

###
# URLs
###
urlpatterns = [
    path('', include(router.urls)),
]
