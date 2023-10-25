##
# Libs
##
from django.urls import path, include
from rest_framework import routers
from app.company.api.v1.views.company_views import CompanyViewSet

###
# Routers
###
router = routers.SimpleRouter()
router.register(r'company', CompanyViewSet, basename='company')

###
# URLs
###
urlpatterns = [
    path('', include(router.urls)),
]
