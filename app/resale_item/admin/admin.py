from django.contrib import admin
from app.resale_item.models.resale_item import ResaleItem


class ResaleItensAdmin(admin.ModelAdmin):
    ...


admin.site.register(ResaleItem, ResaleItensAdmin)
