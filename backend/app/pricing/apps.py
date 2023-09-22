from django.apps import AppConfig


class PricingConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.pricing'

    def ready(self):
        import app.pricing.signals
