###
# Libs
###
from django.apps import AppConfig


###
# Config
###
class ProductConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.product'

    def ready(self):
        import app.product.signals
