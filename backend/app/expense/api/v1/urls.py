##
# Libs
##
from django.urls import path, include
from rest_framework import routers
from app.expense.api.v1.views.expense_views import ExpenseViewSet


###
# Routers
###
router = routers.SimpleRouter()
router.register(
    r'expense',
    ExpenseViewSet,
    basename='expense'
)

###
# URLs
###
urlpatterns = [
    path('', include(router.urls)),
]
