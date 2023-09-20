# Libs
from django.utils.translation import gettext as _
from django.db import models
from app.product.models.product import Product
from .product_registration import ProductRegistration


class ProductRegistrationProduct(models.Model):

    product = models.ForeignKey(
        Product,
        related_name='product_product_registration',
        verbose_name=_('Product'),
        on_delete=models.CASCADE
    )
    product_registration = models.ForeignKey(
        ProductRegistration,
        related_name='product_registration_product',
        verbose_name=_('Product Registration'),
        on_delete=models.CASCADE
    )
