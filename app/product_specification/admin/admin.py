"""
Product Specifications admin
"""
###
# Libraries
###
from django.contrib import admin
from app.product_specification.models.product_specification import ProductSpecification

###
# Inline Admin Models
###


###
# Main Admin Models
###

class ProductSpecificationAdmin(admin.ModelAdmin):
    ...


admin.site.register(ProductSpecification, ProductSpecificationAdmin)
