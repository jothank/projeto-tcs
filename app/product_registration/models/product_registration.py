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
    
    

    def __str__(self):
        return f'Produto: {self.produto}, Item de Revenda: {self.item_revenda}'
