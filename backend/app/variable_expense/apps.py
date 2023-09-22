from django.apps import AppConfig


class VariableExpenseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app.variable_expense'

    def ready(self):
        import app.variable_expense.signals
