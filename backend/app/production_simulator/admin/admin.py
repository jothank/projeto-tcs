"""
ProductionSimulator admin
"""
###
# Libs
###
from django.contrib import admin
from app.production_simulator.models.production_simulator import ProductionSimulator

###
# Inline Admin Models
###


###
# Main Admin Models
###

class ProductionSimulatorAdmin(admin.ModelAdmin):
    list_display = (
        'pricing',
        'production_quantity',
        'amortization',
        'user',
    )


admin.site.register(ProductionSimulator, ProductionSimulatorAdmin)
