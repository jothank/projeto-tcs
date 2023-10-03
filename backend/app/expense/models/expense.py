###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models


###
# Model
###
class Expense(models.Model):

    price = models.FloatField(
        verbose_name=_('Price'),
    )

    name = models.CharField(
        max_length=255,
        verbose_name=_('Name'),
    )
    description = models.TextField(
        verbose_name=_('Description'),
        blank=True,
        null=True,
    )
