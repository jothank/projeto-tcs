###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.product.models.product import Product
from app.combo.models.combo import Combo
from app.accounts.models.user import User


###
# Model
###
class Pricing(models.Model):
    tax = models.FloatField(
        verbose_name=_('Tax'),
    )
    card_tax = models.FloatField(
        verbose_name=_('Card Tax'),
    )
    other = models.FloatField(
        verbose_name=_('Other'),
    )
    profit = models.FloatField(
        verbose_name=_('Profit'),
    )
    suggested_price = models.FloatField(
        verbose_name=_('Suggested Price'),
    )
    delivery_price = models.FloatField(
        verbose_name=_('Delivery Price'),
        blank=True,
        null=True,
    )
    condominium = models.FloatField(
        verbose_name=_('Condominium'),
    )
    product = models.ForeignKey(
        Product,
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        verbose_name=_('Product'),
    )
    combo = models.ForeignKey(
        Combo,
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        verbose_name=_('Combo'),
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_('User'),
    )
