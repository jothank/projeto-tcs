"""
Fixed Expense admin
"""
###
# Libs
###
from django.contrib import admin
from app.cost.models.cost import Cost

###
# Inline Admin Models
###


###
# Main Admin Models
###

class CostAdmin(admin.ModelAdmin):
    ...


admin.site.register(Cost, CostAdmin)
