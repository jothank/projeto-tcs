##
# Libs
##
from django.urls import path, include
from rest_framework import routers
from app.fixed_expense.api.v1.views.fixed_expense_views import FixedExpenseViewSet

###
# Routers
###
router = routers.SimpleRouter()
router.register(
    r'fixed_expense',
    FixedExpenseViewSet,
    basename='fixed_expense'
)

###
# URLs
###
urlpatterns = [
    path('', include(router.urls)),
]
