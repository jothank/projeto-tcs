"""
Fixed Expense admin
"""
###
# Libraries
###
from django.contrib import admin
from app.fixed_expense.models.fixed_expense import FixedExpense

###
# Inline Admin Models
###


###
# Main Admin Models
###

class FixedExpenseAdmin(admin.ModelAdmin):
    ...


admin.site.register(FixedExpense, FixedExpenseAdmin)
