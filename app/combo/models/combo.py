###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.resale_item.models.resale_item import ResaleItem


###
# Model
###
class Combo(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=_('Name')
    )
    resale_item = models.ForeignKey(
        ResaleItem,
        on_delete=models.SET_NULL,
        verbose_name=_('Resale Item'),
    )
