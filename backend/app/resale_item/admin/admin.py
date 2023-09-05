"""
Resale Item admin
"""
###
# Libraries
###
from django.contrib import admin
from app.resale_item.models.resale_item import ResaleItem


###
# Inline Admin Models
###


###
# Main Admin Models
###
class ResaleItensAdmin(admin.ModelAdmin):
    ...


admin.site.register(ResaleItem, ResaleItensAdmin)
