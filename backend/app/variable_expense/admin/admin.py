"""
Variable Expense admin
"""
###
# Libraries
###
from django.contrib import admin
from app.variable_expense.models.variable_expense import VariableExpense

###
# Inline Admin Models
###


###
# Main Admin Models
###

class VariableExpenseAdmin(admin.ModelAdmin):
    ...


admin.site.register(VariableExpense, VariableExpenseAdmin)
