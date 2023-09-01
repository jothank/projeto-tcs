###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models


###
# Model
###
class Ingredient(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Name'))
    quantity = models.FloatField(verbose_name=_('Quantity'))
    value = models.FloatField(verbose_name=_('Value'))
    description = models.TextField(verbose_name=_('Description'))
