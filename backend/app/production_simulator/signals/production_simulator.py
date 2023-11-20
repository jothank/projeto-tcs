from django.db.models.signals import pre_save
from django.dispatch import receiver
from app.production_simulator.models.production_simulator import ProductionSimulator
from app.pricing.models.pricing import Pricing


@receiver(pre_save, sender=ProductionSimulator)
def calculate_amortization(sender, instance, **kwargs):
    if instance.pricing_id:
        pricing_instance = Pricing.objects.get(id=instance.pricing_id)
        condominium_value = pricing_instance.condominium
        instance.amortization = condominium_value * instance.production_quantity
    else:
        instance.amortization = 0
