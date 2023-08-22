from django.apps import AppConfig


class FeedstockConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.feedstock'
    
    def ready(self):
        import app.feedstock.signals
