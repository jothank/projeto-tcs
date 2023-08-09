from django.apps import AppConfig


class AddressConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.address'

    def ready(self):
        import app.address.signals