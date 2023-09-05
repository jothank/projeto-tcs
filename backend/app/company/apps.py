###
# Libs
###
from django.apps import AppConfig

###
# Config
###
class CompanyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.company'

    def ready(self):
        import app.company.signals