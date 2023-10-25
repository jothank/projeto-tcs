"""
Combo admin
"""
###
# Libs
###
from django.contrib import admin
from app.combo.models.combo import Combo
from app.combo.models.combo_product import ComboProduct


###
# Inline Admin Models
###
class ComboProductInline(admin.TabularInline):
    model = ComboProduct
    extra = 0

###
# Main Admin Models
###


class ComboAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', )
    inlines = [ComboProductInline, ]


admin.site.register(Combo, ComboAdmin)
admin.site.register(ComboProduct)
