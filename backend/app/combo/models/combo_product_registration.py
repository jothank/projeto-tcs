###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.product_registration.models.product_registration import ProductRegistration
from app.combo.models.combo import Combo


###
# Model
###
class ComboProductRegistration(models.Model):
    combo = models.ForeignKey(
        Combo,
        related_name='combo_registration',
        verbose_name=_('Combo'),
        on_delete=models.CASCADE
    )
    registration = models.ForeignKey(
        ProductRegistration,
        related_name='registration_combos',
        verbose_name=_('Registration'),
        on_delete=models.CASCADE
    )
