###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models


###
# Model
###
class Company(models.Model):

    name = models.CharField(
        max_length=255,
        verbose_name=_('Name'),
    )
    cnpj = models.CharField(
        max_length=255,
        verbose_name=_('CNPJ'),
    )
    email = models.CharField(
        max_length=255,
        verbose_name=_('Email'),
    )
    phone = models.CharField(
        max_length=255,
        verbose_name=_('Phone'),
    )
    street = models.CharField(
        max_length=255,
        verbose_name=_('Street'),
    )
    number = models.CharField(
        max_length=255,
        verbose_name=_('Number'),
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
    # country = models.CharField(
    #     max_length=255,
    #     verbose_name=_('Country'),
    # )
    zipcode = models.CharField(
        max_length=255,
        verbose_name=_('Zipcode'),
    )

class Meta:
        verbose_name_plural = "Companies"