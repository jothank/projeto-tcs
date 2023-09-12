###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models


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
        blank=False,
        null=False,
    )
    value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name=_('Value'),
        help_text=_('Value'),
        blank=False,
        null=False,
    )
    description = models.TextField(
        verbose_name=_('Description'),
        help_text=_('Description'),
        blank=True,
        null=True,
    )
    @property
    def total_fixed_expense(self):
        return sum([fixed_expense.value for fixed_expense in FixedExpense.objects.all()])