###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from measurement.measures import Mass, Volume


###
# Model
###
class ProductRegistration(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    reseller_item = models.ForeignKey('ResaleItem', on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit_measure = models.CharField(max_length=50)
    percentage_loss = models.DecimalField(max_digits=5, decimal_places=2)
    
    @property
    def unidade_medida(self):
        if self.unit_measure == 'mass':
            return Mass(kg=self.quantity)
        elif self.unit_measure == 'volume':
            return Volume(l=self.quantity)

    @unidade_medida.setter
    def unidade_medida(self, value):
        
        if isinstance(value, Mass):
            self.quantity = value.kg
            self.unit_measure = 'mass'
        elif isinstance(value, Volume):
            self.quantity = value.l
            self.unit_measure = 'volume'

    
    

    def __str__(self):
        return f'Produto: {self.product}, Item de Revenda: {self.reseller_item}'
