from django.db.models.signals import post_save
from django.dispatch import receiver
from app.combo.models.combo import Combo
from app.pricing.models.pricing import Pricing


@receiver(post_save, sender=Combo)
def update_pricing_on_combo_update(sender, instance, **kwargs):
    pricings = Pricing.objects.filter(combo=instance)

    for pricing in pricings:
        base_price = instance.price

        delivery_price = pricing.delivery_price if pricing.delivery_price else 0
        condominium = pricing.condominium if pricing.condominium else 0

        total_cost = base_price + delivery_price + condominium

        divisor = 1 - (pricing.tax/100 + pricing.card_tax/100 +
                       pricing.other/100 + pricing.profit/100)

        suggested_price = total_cost / divisor

        pricing.suggested_price = suggested_price
        pricing.save()
