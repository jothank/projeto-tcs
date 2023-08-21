from django.contrib import admin
from app.product_registration.models.product_registration import ProductRegistration


class ProductRegistrationAdmin(admin.ModelAdmin):
    list_filter = ('product', 'quantity', 'unit_measure', 'percentage_loss', )
    list_display = ('product', 'quantity', 'unit_measure', 'percentage_loss', )
    search_fields = ('product', 'quantity', 'unit_measure', 'percentage_loss', )
    ordering = ('product', 'quantity', 'unit_measure', 'percentage_loss', )
    


admin.site.register(ProductRegistration, ProductRegistrationAdmin)
