###
# Libs
###

from django.db.models.signals import post_save
from django.dispatch import receiver
from app.feedstock.models.feedstock import Feedstock
from app.supply.models.supply import Supply
from app.supply.helpers.supply import calculate_price


###
# Signals
###

@receiver(post_save, sender=Feedstock)
def update_related_supplies(sender, instance, **kwargs):
    related_supplies = Supply.objects.filter(feedstock=instance)

    for supply in related_supplies:
        supply.price = calculate_price(
            instance.price, instance.quantity, instance.unit,
            supply.quantity, supply.unit
        )
        supply.save()
