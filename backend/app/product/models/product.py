###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models


###
# Model
###
class Product(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=_('Name')
    )
    date_validity = models.DateField(
        verbose_name=_('Date Validity')
    )

