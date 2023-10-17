__all__ = [
]

###
# Libs
###
from django.db.models.signals import pre_delete, post_save
from django.dispatch import receiver
from app.supply.models.supply import Supply
from app.product.models.product_supply import ProductSupply


###
# Signals
###

@receiver(post_save, sender=Supply)
def update_related_product_prices(sender, instance, **kwargs):
    related_product_supplies = instance.product_supply.all()
    for product_supply in related_product_supplies:
        product = product_supply.product
        new_price = sum(
            [ps.supply.price for ps in product.supply_product.all()])
        product.price = new_price
        product.save(update_fields=['price'])


@receiver(pre_delete, sender=Supply)
def supply_delete(sender, instance, **kwargs):
    product_supplies = ProductSupply.objects.filter(supply=instance)

    for product_supply in product_supplies:
        product = product_supply.product
        product.price -= instance.price
        product.save(update_fields=['price'])
