###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.accounts.models.user import User

###
# Model
###


class Feedstock(models.Model):
    name = models.CharField(max_length=100, verbose_name=_('Name'))
    price = models.FloatField(verbose_name=_('Price'))
    quantity = models.FloatField(verbose_name=_('Quantity'))
    unit = models.CharField(max_length=20, verbose_name=_('Unit'))
    type = models.CharField(max_length=20, verbose_name=_(
        'Type'), null=True, blank=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name=_('User'))

    def __str__(self):
        return self.name
