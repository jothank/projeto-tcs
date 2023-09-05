from django.db.models.signals import post_migrate
from django.dispatch import receiver
from app.utils.models.models import Unit

@receiver(post_migrate)
def insert_unit_choices(sender, **kwargs):
    if sender.name == 'app.utils':
        for choice in Unit.UNIT_CHOICES:
            abbreviation, full_name = choice
            unit_values = {
                'kg': 1000,
                'g': 1,
                'mg': 0.001,
                't': 1000000,
                'lb': 453.592,
                'oz': 28.3495,
                'l': 1000,
                'ml': 1,
                'gal': 3785.41,
                'pt': 473.176,
                'qt': 946.353,
                'floz': 29.5735,
                # Defina outros valores aqui
            }
            value_in_base_unit = unit_values.get(abbreviation, 1)  # Obter valor da unidade na base ou usar 1 se não encontrado
            Unit.objects.get_or_create(
                abbreviation=abbreviation,
                full_name=full_name,
                value_in_base_unit=value_in_base_unit
            )
