"""
Pricing admin
"""
###
# Libs
###
from django.contrib import admin
from app.pricing.models.pricing import Pricing

###
# Inline Admin Models
###


###
# Main Admin Models
###

class PricingAdmin(admin.ModelAdmin):
    ...


admin.site.register(Pricing, PricingAdmin)
