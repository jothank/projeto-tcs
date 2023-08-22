###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from measurement.measures import Mass
from measurement.utils import guess


###
# Model
###

class Feedstock(models.Model):
    
    unique_key = models.AutoField(primary_key=True)
    value = models.FloatField()
    mass = models.CharField(max_length=50)  

    def get_mass_measurement(self):
        return Mass(self.value, guess(self.mass))

    def save(self, *args, **kwargs):
        try:
            Mass(self.value, guess(self.mass))
        except ValueError:
            raise ValueError("Invalid mass unit.")
        super().save(*args, **kwargs)
