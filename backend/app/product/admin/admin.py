"""
Product  admin
"""
###
# Libs
###
from django.contrib import admin
from app.product.models.product import Product
from app.product.models.product_supply import ProductSupply


###
# Inline Admin Models
###
class ProductSupplyInline(admin.TabularInline):
    model = ProductSupply
    extra = 0

###
# Main Admin Models
###


class ProductAdmin(admin.ModelAdmin):
    filter_horizontal = ('supplies',)
    inlines = [ProductSupplyInline, ]


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductSupply)
