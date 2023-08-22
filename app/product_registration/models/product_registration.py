###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from measurement.measures import Mass, Volume
from app.product.models.product import Product
from app.resale_item.models.resale_item import ResaleItem


###
# Model
###
class ProductRegistration(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit_measure = models.CharField(max_length=50)
    percentage_loss = models.DecimalField(max_digits=5, decimal_places=2)

    @property
    def unidade_medida(self):
        if self.unit_measure == 'mass':
            return Mass(kg=self.insumos.quantity)
        elif self.unit_measure == 'volume':
            return Volume(l=self.insumos.quantity)
        elif self.unit_measure == 'ml':
            return Volume(ml=self.insumos.quantity)
        elif self.unit_measure == 'g':
            return Mass(g=self.insumos.quantityy)
        elif self.unit_measure == 'mg':
            return Mass(mg=self.insumos.quantity)

    @unidade_medida.setter
    def unidade_medida(self, value):

        if isinstance(value, Mass):
            self.insumos.quantity = value.kg
            if value.unit == 'g':
                self.unit_measure = 'g'
            elif value.unit == 'mg':
                self.unit_measure = 'mg'
            else:
                self.unit_measure = 'mass'
        elif isinstance(value, Volume):
            self.insumos.quantity = value.l
            self.unit_measure = 'volume'
            if isinstance(value, Volume):
                self.insumos.quantity = value.ml
                self.unit_measure = 'ml'

    def __str__(self):
        return f'ProductRegistration ID: {self.id}'
