###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.feedstock.models.feedstock import feedstock


###
# Model
###
class Product(models.Model):

    feedstock = models.ForeignKey(
        feedstock, on_delete=models.CASCADE, verbose_name=_('feedstock')
    )
    quantity = models.FloatField(
        verbose_name=_('Quantity')
    )
    unit = models.CharField(
        max_length=255,
        verbose_name=_('Unit')
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name=_('Price')
    )
