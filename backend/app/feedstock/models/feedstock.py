###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models

###
# Model
###

class Feedstock(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    medidas_massa = models.ManyToManyField('utils.Unit', related_name='feedstocks') 

    def __str__(self):
        return self.nome