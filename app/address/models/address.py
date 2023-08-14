from django.utils.translation import gettext as _
from django.db import models


class Address(models.Model): 
    
    street = models.CharField(
        verbose_name=_('Street'),
        max_length=255,
        
    )
    number = models.CharField(
        verbose_name=_('Number'),
        max_length=255,
       
    )
    complement = models.CharField(
        verbose_name=_('Complement'),
        max_length=255,
       
    )
    neighborhood = models.CharField(
        verbose_name=_('Neighborhood'),
        max_length=255,
        
    )
    city = models.CharField(
        verbose_name=_('City'),
        max_length=255,
        
    )
    state = models.CharField(
        verbose_name=_('State'),
        max_length=255,
        
    )
    country = models.CharField(
        verbose_name=_('Country'),
        max_length=255,
        
    )
    zipcode = models.CharField(
        verbose_name=_('Zipcode'),
        max_length=255,
       
    )
  

