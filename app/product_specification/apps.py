"""
ProductSpecification
"""
###
# Libraries
###
from django.apps import AppConfig


###
# Config
###
class ProductSpecificationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.product_specification'

    def ready(self):
        import app.product_specification.signals
