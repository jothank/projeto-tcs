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
class ResaleItensConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.resale_itens'

    def ready(self):
        import app.resale_itens.signals
