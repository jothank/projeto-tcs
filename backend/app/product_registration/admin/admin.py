"""
Product Registration admin
"""
###
# Libraries
###
from django.contrib import admin
from app.product_registration.models.product_registration import ProductRegistration

###
# Inline Admin Models
###


###
# Main Admin Models
###s

class ProductRegistrationAdmin(admin.ModelAdmin):
    list_filter = ('products', 'producion_price', )
  
    search_fields = ('products', 'producion_price',)
    ordering = ('products', 'producion_price',)


admin.site.register(ProductRegistration, ProductRegistrationAdmin)
