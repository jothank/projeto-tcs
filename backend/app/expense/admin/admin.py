"""
Fixed Expense admin
"""
###
# Libraries
###
from django.contrib import admin
from app.expense.models.expense import Expense

###
# Inline Admin Models
###


###
# Main Admin Models
###

class ExpenseAdmin(admin.ModelAdmin):
    ...


admin.site.register(Expense, ExpenseAdmin)
