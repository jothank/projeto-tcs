##
# Libs
##
from django.urls import path, include
from rest_framework import routers
from app.combo.api.v1.views.combo_views import ComboViewSet

###
# Routers
###
router = routers.SimpleRouter()
router.register(r'combo', ComboViewSet, basename='combo')

###
# URLs
###
urlpatterns = [
    path('', include(router.urls)),
]
