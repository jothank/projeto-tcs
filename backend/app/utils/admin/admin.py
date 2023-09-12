from django.contrib import admin
from app.utils.models.unit import Unit

@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ('name',)
