__all__ = [
]

###
# Libs
###
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from app.supply.models.product import Supply
from app.product.models.product_registration_product import ProductSupply


###
# Signals
###
@receiver(pre_delete, sender=Supply)
def supply_delete(sender, instance, **kwargs):
    product_supplies = ProductSupply.objects.filter(supply=instance)

    for product_supply in product_supplies:
        product = product_supply.product
        product.price -= instance.price
        product.save(update_fields=['price'])
        
