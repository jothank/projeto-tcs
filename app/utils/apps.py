from django.apps import AppConfig


class UtilsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.utils'

    def ready(self):
        import app.utils.signals.signals