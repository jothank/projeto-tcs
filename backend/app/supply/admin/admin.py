"""
Product admin
"""
###
# Libraries
###
from django.contrib import admin
from app.supply.models.product import Supply


###
# Inline Admin Models
###


###
# Main Admin Models
###
class SupplyAdmin(admin.ModelAdmin):
    ...

admin.site.register(Supply, SupplyAdmin)
