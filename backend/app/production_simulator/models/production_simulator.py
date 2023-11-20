###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.accounts.models.user import User
from app.pricing.models.pricing import Pricing


###
# Model
###
class ProductionSimulator(models.Model):

    pricing = models.ForeignKey(
        Pricing,
        on_delete=models.CASCADE,
        verbose_name=_('Pricing'),
    )
    production_quantity = models.FloatField(
        verbose_name=_('Production Quantity'),
    )
    amortization = models.FloatField(
        verbose_name=_('Amortization'),
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_('User'),
    )
