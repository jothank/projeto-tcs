"""
ResaleItens
"""
###
# Libraries
###
from django.apps import AppConfig


###
# Config
###
class ResaleItemConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.resale_item'

    def ready(self):
        import app.resale_item.signals
