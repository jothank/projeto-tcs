###
# Libs
###
from django.utils.translation import gettext as _
from django.apps import AppConfig


###
# Config
###
class ComboConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.combo'

    def ready(self):
        import app.combo.signals
