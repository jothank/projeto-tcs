from django.apps import AppConfig


class ComboConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.combo'

    def ready(self):
        import app.combo.signals
