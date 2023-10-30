###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.feedstock.models.feedstock import Feedstock
from app.accounts.models.user import User


###
# Model
###
class Supply(models.Model):

    feedstock = models.ForeignKey(
        Feedstock, on_delete=models.CASCADE, verbose_name=_('feedstock')
    )
    quantity = models.FloatField(
        verbose_name=_('Quantity')
    )
    unit = models.CharField(
        max_length=255,
        verbose_name=_('Unit')
    )
    price = models. FloatField(
        verbose_name=_('Price')
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_('User'),
    )
