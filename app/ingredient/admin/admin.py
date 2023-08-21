"""
Ingredient admin
"""
###
# Libraries
###
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from app.ingredient.models.ingredient import Ingredient


###
# Inline Admin Models
###


###
# Main Admin Models
###
class IngredientAdmin(BaseUserAdmin):
    ...


admin.site.register(Ingredient, IngredientAdmin)
