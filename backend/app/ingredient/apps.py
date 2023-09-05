###
# Libs
###
from django.apps import AppConfig

###
# Config
###
class IngredientConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.ingredient'

    def ready(self):
        import app.ingredient.signals
