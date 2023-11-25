###
# Libs
###
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from ..models.pricing import Pricing
from app.production_simulator.models.production_simulator import ProductionSimulator


###
# Signals
###
@receiver(pre_save, sender=Pricing)
def calculate_suggested_price(sender, instance, **kwargs):
    if instance.product:
        base_price = instance.product.price
    elif instance.combo:
        base_price = instance.combo.price
    else:
        base_price = 0

    delivery_price = instance.delivery_price if instance.delivery_price else 0
    condominium = instance.condominium if instance.condominium else 0

    total_cost = base_price + delivery_price + condominium

    divisor = 1 - (instance.tax/100 + instance.card_tax/100 +
                   instance.other/100 + instance.profit/100)
    suggested_price = total_cost / divisor
    instance.suggested_price = suggested_price


@receiver(post_save, sender=Pricing)
def update_production_simulator_on_pricing_update(sender, instance, **kwargs):
    for simulator in ProductionSimulator.objects.filter(pricing=instance):
        simulator.amortization = instance.condominium * simulator.production_quantity
        simulator.save()
