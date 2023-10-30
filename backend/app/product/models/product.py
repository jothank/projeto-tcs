###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.supply.models.supply import Supply
from app.accounts.models.user import User


###
# Models
###
class Product(models.Model):

    name = models.CharField(max_length=255, verbose_name=_('Name'))

    supplies = models.ManyToManyField(
        Supply,
        through='ProductSupply',
        related_name='supplies',
        verbose_name=_('Supplies'),
    )

    price = models.FloatField(verbose_name=_('Price'))

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_('User'),
    )
