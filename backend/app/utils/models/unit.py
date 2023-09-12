from django.utils.translation import gettext as _
from django.db import models
from app.utils.constants import UNIT_CHOICES

class Unit(models.Model):

    abbreviation = models.CharField(
        max_length=4, 
        choices=UNIT_CHOICES, 
        unique=True, 
        verbose_name=_("Abbreviation")
    )
    full_name = models.CharField(
        max_length=255, 
        choices=UNIT_CHOICES, 
        unique=True,
        verbose_name=_("Full name")
    )
    value_in_base_unit = models.FloatField(verbose_name=_("Value in base unit")) 

    @staticmethod
    def get_sorted_choices():
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

        sorted_choices = sorted(Unit.UNIT_CHOICES, key=lambda unit: unit_values[unit[0]], reverse=True)
        return sorted_choices

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = _('Unidade')
        verbose_name_plural = _('Unidades')
        ordering = ['id']        