##
# Libs
##
from django.urls import path, include
from rest_framework import routers
from app.feedstock.api.v1.views.feedstock_views import FeedstockViewSet

###
# Routers
###
router = routers.SimpleRouter()
router.register(r'feedstock', FeedstockViewSet, basename='feedstock')

###
# URLs
###
urlpatterns = [
    path('', include(router.urls)),
]