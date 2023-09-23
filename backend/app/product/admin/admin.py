"""
Product admin
"""
###
# Libraries
###
from django.contrib import admin
from app.product.models.product import Product


###
# Inline Admin Models
###


###
# Main Admin Models
###
class ProductAdmin(admin.ModelAdmin):
    ...

admin.site.register(Product, ProductAdmin)
