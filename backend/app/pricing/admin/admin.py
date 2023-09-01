from django.contrib import admin
from app.pricing.models.pricing import Pricing

class PricingAdmin(admin.ModelAdmin):
    ...


admin.site.register(Pricing, PricingAdmin)
