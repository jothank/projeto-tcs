"""
Supply admin
"""
###
# Libs
###
from django.contrib import admin
from app.supply.models.supply import Supply


###
# Inline Admin Models
###


###
# Main Admin Models
###
class SupplyAdmin(admin.ModelAdmin):
    list_display = ('id', 'feedstock', 'price', 'quantity', 'unit')
admin.site.register(Supply, SupplyAdmin)
