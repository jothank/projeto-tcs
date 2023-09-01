###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models


###
# Model
###
class Pricing(models.Model):
    """
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('Unit Price'))
    total_fixed_expenses = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('Total Fixed Expenses'))
    total_variable_expenses = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('Total Variable Expenses'))
    estimated_profit_percentage = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('Estimated Profit Percentage'))
    suggested_selling_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('Suggested Selling Price'))
    """
