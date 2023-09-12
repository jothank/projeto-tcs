from django.contrib import admin
from app.utils.models.unit import Unit

@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ("abbreviation", "value_in_base_unit", "full_name")
