###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models

###
# Model
###


class Feedstock(models.Model):
    name = models.CharField(max_length=100, verbose_name=_('Name'))
    price = models.FloatField(verbose_name=_('Price'))
    quantity = models.FloatField(verbose_name=_('Quantity'))
    unit = models.CharField(max_length=20, verbose_name=_('Unit'))

    def __str__(self):
        return self.name
    
