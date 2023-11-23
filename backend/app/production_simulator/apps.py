###
# Libs
###
from django.apps import AppConfig


###
# Config
###
class ProductionSimulatorConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.production_simulator'

    def ready(self):
        import app.production_simulator.signals
