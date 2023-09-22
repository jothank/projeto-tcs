from django.contrib import admin
from app.utils.models.unit import Unit

class UnitAdmin(admin.ModelAdmin):
    ...
    
admin.site.register(Unit, UnitAdmin)