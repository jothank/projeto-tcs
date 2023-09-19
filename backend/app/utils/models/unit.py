from django.db import models
from django.utils.translation import gettext as _
from django.db.models.signals import post_migrate
from django.dispatch import receiver

class Unit(models.Model):
    QUILO = 'Quilo'
    VOLUME = 'Volume'
    UNIDADE = 'Unidade'

    UNIDADE_CHOICES = [
        (QUILO, 'Quilo'),
        (VOLUME, 'Volume'),
        (UNIDADE, 'Unidade'),
    ]

    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100, choices=UNIDADE_CHOICES)

    def __str__(self):
        return self.nome

# Signal to create units after migrations
@receiver(post_migrate)
def create_units(sender, **kwargs):
    for choice in Unit.UNIDADE_CHOICES:
        unit, created = Unit.objects.get_or_create(nome=choice[0])
