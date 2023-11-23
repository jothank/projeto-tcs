###
# Libs
###
from django.apps import AppConfig


###
# Config
###
class SupplyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.supply'

    def ready(self):
        import app.supply.signals
