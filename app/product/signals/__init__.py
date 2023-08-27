from django.db.models.signals import post_save
from django.dispatch import receiver
from app.product.models import Product  
from decimal import Decimal
from product_registration.models import ProductRegistration  

@receiver(post_save, sender=Product)
def add_percentage_loss(sender, instance, created, **kwargs):
    if created:
        quantity_value = instance.quantity
        
        ProductRegistration.objects.create(
            product=instance,
            quantity=quantity_value,  
            unit_measure='',
            percentage_loss=Decimal('5') / 100
        )
