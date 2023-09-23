###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.product_registration.models import ProductRegistration


###
# Model
###
class Combo(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=_('Name')
    )
    registration = models.ManyToManyField(
        ProductRegistration,
        through='ComboProductRegistration',
        related_name='combos',  
        verbose_name=_('Registration')
    )