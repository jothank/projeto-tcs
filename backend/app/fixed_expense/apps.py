###
# Libs
###
from django.apps import AppConfig

###
# Config
###
class FixedExpenseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.fixed_expense'

    def ready(self):
        import app.fixed_expense.signals
