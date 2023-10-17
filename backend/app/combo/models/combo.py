###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.product.models.product import Product


###
# Model
###
class Combo(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=_('Name')
    )
    products = models.ManyToManyField(
        Product,
        through='ComboProduct',
        related_name='combo',
        verbose_name=_('Products')
    )
    purchase_price = models.FloatField(verbose_name=_('Purchase price'))
