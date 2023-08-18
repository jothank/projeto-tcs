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
    description = models.CharField(
        max_length=255,
        verbose_name=_('Description')
    )
    purchase_price = models.DecimalField(
        verbose_name=_('Purchase Price'),
    )
