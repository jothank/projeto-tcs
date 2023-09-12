###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models


###
# Model
###
class ResaleItem(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=_('Name')
    )
    description = models.TextField(
        verbose_name=_('Description'),
        help_text=_('Description'),
        blank=True,
        null=True,
    )
    purchase_price = models.FloatField(
        verbose_name=_('Purchase Price'),
    )
