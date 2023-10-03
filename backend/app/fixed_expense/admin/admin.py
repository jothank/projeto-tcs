"""
Fixed Expense admin
"""
###
# Libraries
###
from django.contrib import admin
from app.fixed_expense.models.fixed_expense import FixedExpense
from app.fixed_expense.models.expense_fixed_expense import FixedExpenseExpense

###
# Inline Admin Models
###


class FixedExpenseExpenseInline(admin.TabularInline):
    model = FixedExpenseExpense
    extra = 0

###
# Main Admin Models
###


class FixedExpenseAdmin(admin.ModelAdmin):
    inlines = [FixedExpenseExpenseInline, ]


admin.site.register(FixedExpense, FixedExpenseAdmin)
admin.site.register(FixedExpenseExpense)
