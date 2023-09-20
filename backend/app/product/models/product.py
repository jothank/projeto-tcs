###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.feedstock.models.feedstock import Feedstock


###
# Model
###
class Product(models.Model):
 
    name = models.CharField(
        max_length=255,
        verbose_name=_('Name')
    )
    feedstock = models.ForeignKey(
        Feedstock, on_delete=models.CASCADE, verbose_name=_('Feedstock')
    )
    quantity = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name=_('Quantity')
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name=_('Price')
    )
