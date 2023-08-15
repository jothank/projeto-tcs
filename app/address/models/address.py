###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models


###
# Model
###
class Address(models.Model):

    street = models.CharField(
        max_length=255,
        verbose_name=_('Street'),

    )
    number = models.CharField(
        max_length=255,
        verbose_name=_('Number'),

    )
    complement = models.CharField(
        max_length=255,
        verbose_name=_('Complement'),

    )
    neighborhood = models.CharField(
        max_length=255,
        verbose_name=_('Neighborhood'),

    )
    city = models.CharField(
        max_length=255,
        verbose_name=_('City'),

    )
    state = models.CharField(
        max_length=255,
        verbose_name=_('State'),

    )
    country = models.CharField(
        max_length=255,
        verbose_name=_('Country'),

    )
    zipcode = models.CharField(
        max_length=255,
        verbose_name=_('Zipcode'),
    )
