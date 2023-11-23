###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.supply.models.supply import (
    Supply
)
from .product import Product
from app.accounts.models.user import User


###
# Models
###
class ProductSupply(models.Model):

    supply = models.ForeignKey(
        Supply,
        related_name='product_supply',
        verbose_name=_('Product'),
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        related_name='supply_product',
        verbose_name=_('Product'),
        on_delete=models.CASCADE
    )