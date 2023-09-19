###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.feedstock.models.feedstock import Feedstock as FeedS


###
# Model
###
class Product(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=_('Name')
    )
    feedstock = models.ForeignKey(
        FeedS, on_delete=models.CASCADE, verbose_name=_('Feedstock')

    )

    quantity = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name=_('Quantity')
    )

    def unit_cost(self):
        for product in self.productS:
            product.feedstock.value * product.quantity
