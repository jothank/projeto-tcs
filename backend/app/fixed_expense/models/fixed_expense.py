###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.cost.models.cost import Cost
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
    )
    total_price = models.FloatField(
        verbose_name=_('Total Price'),
    )
    costs = models.ManyToManyField(
        Cost,
        through='FixedExpenseCost',
        related_name='costs',
        verbose_name=_('Costs'),
    )
    description = models.TextField(
        verbose_name=_('Description'),
        blank=True,
        null=True,
    )
    type = models.CharField(
        max_length=255,
        verbose_name=_('Type'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_('User'),
    )
