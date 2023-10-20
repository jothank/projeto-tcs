###
# Libs
###
from django.db.models.signals import pre_delete, post_save
from django.dispatch import receiver
from app.supply.models.supply import Supply
from app.product.models.product_supply import ProductSupply
from app.supply.helpers.supply import calculate_price

###
# Signals
###


@receiver(post_save, sender=Supply)
def update_related_product_prices(sender, instance, created, **kwargs):
    if not created:
        instance.price = calculate_price(
            feedstock_price=instance.feedstock.price,
            feedstock_quantity=instance.feedstock.quantity,
            feedstock_unit=instance.feedstock.unit,
            quantity=instance.quantity,
            unit=instance.unit
        )
        Supply.objects.filter(pk=instance.pk).update(price=instance.price)

    related_product_supplies = instance.product_supply.all()
    for product_supply in related_product_supplies:
        product = product_supply.product

        new_price = 0
        for ps in product.supply_product.all():
            calculated_price = calculate_price(
                feedstock_price=ps.supply.feedstock.price,
                feedstock_quantity=ps.supply.feedstock.quantity,
                feedstock_unit=ps.supply.feedstock.unit,
                quantity=ps.supply.quantity,
                unit=ps.supply.unit
            )
            new_price += calculated_price

        product.price = new_price
        product.save(update_fields=['price'])


@receiver(pre_delete, sender=Supply)
def supply_delete(sender, instance, **kwargs):
    product_supplies = ProductSupply.objects.filter(supply=instance)

    for product_supply in product_supplies:
        product = product_supply.product
        product.price -= instance.price
        product.save(update_fields=['price'])
