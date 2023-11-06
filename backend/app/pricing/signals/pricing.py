###
# Libs
###
from django.db.models.signals import pre_save
from django.dispatch import receiver
from ..models.pricing import Pricing


###
# Signals
###
@receiver(pre_save, sender=Pricing)
def calculate_suggested_price(sender, instance, **kwargs):
    product_price = instance.product.price
    total_cost = product_price + instance.delivery_price + instance.condominium
    divisor = 1 - (instance.tax/100 + instance.card_tax/100 +
                   instance.other/100 + instance.profit/100)
    suggested_price = total_cost / divisor
    instance.suggested_price = suggested_price
