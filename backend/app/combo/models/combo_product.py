###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.product.models.product import Product
from app.combo.models.combo import Combo
from app.accounts.models.user import User


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