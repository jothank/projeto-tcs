"""
Combo admin
"""
###
# Libraries
###
from django.contrib import admin
from app.combo.models.combo import Combo
from app.combo.models.combo_product_registration import ComboProductRegistration


###
# Inline Admin Models
###
class ComboProductRegistrationInline(admin.TabularInline):
    model = ComboProductRegistration
    extra = 0

###
# Main Admin Models
###


class ComboAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', )
    inlines = [ComboProductRegistrationInline, ]


admin.site.register(Combo, ComboAdmin)
admin.site.register(ComboProductRegistration)
