from django.apps import AppConfig


class SupplyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.supply'

    def ready(self):
        import app.supply.signals
