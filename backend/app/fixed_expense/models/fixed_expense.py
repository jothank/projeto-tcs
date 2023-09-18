###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.company.models.company import Company


###
# Model
###
class FixedExpense(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        verbose_name=_('Company'),
    )
    date = models.DateField(
        verbose_name=_('Date'),
    )
    name = models.CharField(
        max_length=255,
        verbose_name=_('Name'),
        help_text=_('Name'),
    )
    value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name=_('Value'),
        help_text=_('Value'),
    )
    description = models.TextField(
        verbose_name=_('Description'),
        help_text=_('Description'),
        blank=True,
        null=True,
    )

    @property
    def total_fixed_expense(self):
<<<<<<< HEAD
        total= sum([fixed_expense.value for fixed_expense in FixedExpense.objects.all()])
        return total
=======
        return sum([fixed_expense.value for fixed_expense in FixedExpense.objects.all()])
>>>>>>> c5dfec54f9173e9515309b6e26c2c3224ed23700
