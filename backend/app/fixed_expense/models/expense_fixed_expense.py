###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.cost.models.cost import Cost
from app.fixed_expense.models.fixed_expense import FixedExpense
from app.accounts.models.user import User


###
# Model
###
class FixedExpenseCost(models.Model):
    cost = models.ForeignKey(
        Cost,
        related_name='fixed_expense_cost',
        verbose_name=_('Cost'),
        on_delete=models.CASCADE,
    )

    fixed_expense = models.ForeignKey(
        FixedExpense,
        related_name='cost_fixed_expenses',
        verbose_name=_('Fixed Expense'),
        on_delete=models.CASCADE,
    )
