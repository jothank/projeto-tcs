###
# Libs
###
from django.apps import AppConfig

###
# Config
###


class CostConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.cost'

    def ready(self):
        import app.cost.signals
