###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.product.models.product_registration import Product
from app.combo.models.combo import Combo


###
# Model
###
class ComboProduct(models.Model):
    combo = models.ForeignKey(
        Combo,
        related_name='combo_product',
        verbose_name=_('Combo'),
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product,
        related_name='product_combo',
        verbose_name=_('Products'),
        on_delete=models.CASCADE
    )
