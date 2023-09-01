"""
API V1: Ingredinet Views
"""
###
# Libraries
###
from rest_framework import viewsets
from app.ingredient.models.ingredient import Ingredient
from app.ingredient.api.v1.serializers.ingredient.default import DefaultIngredientSerializer

###
# Viewsets
###


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = DefaultIngredientSerializer
