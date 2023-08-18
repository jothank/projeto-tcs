from django.apps import AppConfig


class ProductRegistrationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.product_registration'

    def ready(self):
        import app.product_registration.signals
