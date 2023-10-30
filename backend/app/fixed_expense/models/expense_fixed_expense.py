###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.expense.models.expense import Expense
from app.fixed_expense.models.fixed_expense import FixedExpense
from app.accounts.models.user import User


###
# Model
###
class FixedExpenseExpense(models.Model):
    expense = models.ForeignKey(
        Expense,
        related_name='fixed_expense_expenses',
        verbose_name=_('Expense'),
        on_delete=models.CASCADE,
    )

    fixed_expense = models.ForeignKey(
        FixedExpense,
        related_name='expense_fixed_expenses',
        verbose_name=_('Fixed Expense'),
        on_delete=models.CASCADE,
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_('User'),
    )
