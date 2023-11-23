"""
Fixed Expense admin
"""
###
# Libs
###
from django.contrib import admin
from app.fixed_expense.models.fixed_expense import FixedExpense
from app.fixed_expense.models.expense_fixed_expense import FixedExpenseCost

###
# Inline Admin Models
###


class FixedExpenseCostInline(admin.TabularInline):
    model = FixedExpenseCost
    extra = 0

###
# Main Admin Models
###


class FixedExpenseAdmin(admin.ModelAdmin):
    inlines = [FixedExpenseCostInline, ]


admin.site.register(FixedExpense, FixedExpenseAdmin)
admin.site.register(FixedExpenseCost)
