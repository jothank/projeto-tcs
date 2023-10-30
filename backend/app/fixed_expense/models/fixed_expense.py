###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.expense.models.expense import Expense
from app.accounts.models.user import User


###
# Model
###
class FixedExpense(models.Model):

    date = models.DateField(
        verbose_name=_('Date'),
    )
    name = models.CharField(
        max_length=255,
        verbose_name=_('Name'),
        help_text=_('Name'),
    )
    total_price = models.FloatField(
        verbose_name=_('Total Price'),
    )
    expenses = models.ManyToManyField(
        Expense,
        through='FixedExpenseExpense',
        related_name='expenses',
        verbose_name=_('Expenses'),
    )
    description = models.TextField(
        verbose_name=_('Description'),
        help_text=_('Description'),
        blank=True,
        null=True,
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_('User'),
    )
