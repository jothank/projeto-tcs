###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.utils.models.unit import Unit


###
# Model
###

class Feedstock(models.Model):
    name = models.CharField(max_length=100, verbose_name=_('Name'))
    quantity = models.FloatField(verbose_name=_('Quantity'))
    unit = models.ForeignKey(
        Unit,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name=_('Units')
    )
    value = models.FloatField(verbose_name=_('Value'))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Feedstock')
        verbose_name_plural = _('Feedstocks')
        ordering = ['id']
