###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.resale_item.models.resale_item import ResaleItem
from app.product.models.product import Product


###
# Model
###
class Combo(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=_('Name')
    )
    resale_item = models.ForeignKey(
        ResaleItem,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name=_('Resale Item'),
    )
    products = models.ManyToManyField(
        Product,
        verbose_name=_('Products'),
    )
