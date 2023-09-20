# Libs
from django.utils.translation import gettext as _
from django.db import models
from app.product.models.product import Product


class ProductRegistration(models.Model):

    products = models.ManyToManyField(
        Product,
        through='ProductRegistrationProduct',
        related_name='product_registrations',
        verbose_name=_('Products'),
    )

    producion_price = models.FloatField(verbose_name=_('Production Price'))
