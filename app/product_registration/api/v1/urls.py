##
# Libraries
##
from django.urls import path, include
from rest_framework import routers
from app.product_registration.api.v1.views.product_registration_views import ProductRegistrationViewSet


# Routers
router = routers.SimpleRouter()
router.register(r'produtregistration', ProductRegistrationViewSet, basename='product registration')

# URLs
urlpatterns = [
    path('', include(router.urls)),
]
