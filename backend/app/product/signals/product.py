###
# Libs
###
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from app.combo.models.combo import Combo
from app.product.models.product import Product


###
# Signals
###
@receiver(post_save, sender=Product)
def update_combo_prices(sender, instance, **kwargs):
    combos_with_product = Combo.objects.filter(products=instance)

    for combo in combos_with_product:
        combo.price = combo.products.aggregate(total_price=models.Sum('price'))[
            'total_price'] or 0
        combo.save()
