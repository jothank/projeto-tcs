from django.contrib import admin
from app.fixed_expense.models.fixed_expense import FixedExpense


class FixedExpenseAdmin(admin.ModelAdmin):
    ...


admin.site.register(FixedExpense, FixedExpenseAdmin)
