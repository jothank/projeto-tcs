# Libs
from django.utils.translation import gettext as _
from django.db import models
from measurement.measures import Mass, Volume
from app.product.models.product import Product
from app.feedstock.models.feedstock import Feedstock as FeedS
from app.utils.models.unit import Unit


class ProductRegistration(models.Model):
    productS = models.ManyToManyField(
        Product, through='ProductRegistrationComposition')
    producion_price = models.FloatField(verbose_name=_('Production Price'))

    def sum(self):
        total = 0
        for product in self.productS:
            total += product.feedstock.value * product.quantity
        self.producion_price = total
        

   