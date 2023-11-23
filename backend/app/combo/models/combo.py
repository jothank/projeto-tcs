###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.product.models.product import Product
from app.accounts.models.user import User


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
    price = models.FloatField(verbose_name=_('Purchase price'))
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_('User')
    )
