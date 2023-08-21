from django.contrib import admin
from app.product_registration.models.product_registration import ProductRegistration


class ProductRegistrationAdmin(admin.ModelAdmin):
    ...


admin.site.register(ProductRegistration, ProductRegistrationAdmin)
