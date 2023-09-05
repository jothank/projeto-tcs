from django.utils.translation import gettext as _
from django.db import models
from app.utils.models.models import Unit

class Feedstock(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    quantity = models.FloatField()
    units = models.ManyToManyField(Unit, related_name='feedstocks')
    value = models.FloatField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Matéria-prima')
        verbose_name_plural = _('Matérias-primas')
        ordering = ['id']
        