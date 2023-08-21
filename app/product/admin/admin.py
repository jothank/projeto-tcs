from django.contrib import admin
from app.product.models.product_registration import Product


class ProductAdmin(admin.ModelAdmin):
    ...


admin.site.register(Product, ProductAdmin)
