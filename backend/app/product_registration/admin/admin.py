"""
Product Registration admin
"""
###
# Libraries
###
from django.contrib import admin
from app.product_registration.models.product_registration import ProductRegistration
from app.product_registration.models.product_registration_product import ProductRegistrationProduct


###
# Inline Admin Models
###
class ProductRegistrationProductInline(admin.TabularInline):
    model = ProductRegistrationProduct
    extra = 0

###
# Main Admin Models
###


class ProductRegistrationAdmin(admin.ModelAdmin):
    filter_horizontal = ('products',)
    inlines = [ProductRegistrationProductInline, ]


admin.site.register(ProductRegistration, ProductRegistrationAdmin)
admin.site.register(ProductRegistrationProduct)
