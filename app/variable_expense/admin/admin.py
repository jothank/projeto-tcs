from django.contrib import admin
from app.variable_expense.models.variable_expense import VariableExpense


class VariableExpenseAdmin(admin.ModelAdmin):
    ...


admin.site.register(VariableExpense, VariableExpenseAdmin)
