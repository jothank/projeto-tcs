"""
Combo admin
"""
###
# Libraries
###
from django.contrib import admin
from app.combo.models.combo import Combo

###
# Inline Admin Models
###


###
# Main Admin Models
###

class ComboAdmin(admin.ModelAdmin):
    ...


admin.site.register(Combo, ComboAdmin)
