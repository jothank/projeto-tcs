##
# Libraries
##
from django.urls import path, include
from rest_framework import routers
from app.ingredient.api.v1.views.ingredient_view import IngredientViewSet


# Routers
router = routers.SimpleRouter()
router.register(r'ingredient', IngredientViewSet, basename='ingredient')

# URLs
urlpatterns = [
    path('', include(router.urls)),
]
