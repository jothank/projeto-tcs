from django.contrib import admin
from app.combo.models.combo import Combo


class ComboAdmin(admin.ModelAdmin):
    ...


admin.site.register(Combo, ComboAdmin)
