"""
Product Registration admin
"""
###
# Libraries
###
from django.contrib import admin
from app.product.models.product_registration import Product
from app.product.models.product_registration_product import ProductSupply


###
# Inline Admin Models
###
class ProductRegistrationProductInline(admin.TabularInline):
    model = ProductSupply
    extra = 0

###
# Main Admin Models
###


class ProductAdmin(admin.ModelAdmin):
    filter_horizontal = ('supplies',)
    inlines = [ProductRegistrationProductInline, ]


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductSupply)
