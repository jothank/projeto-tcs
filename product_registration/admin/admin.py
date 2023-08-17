from django.contrib import admin
from app.address.models.address import Address


class ResaleItensAdmin(admin.ModelAdmin):
    ...


admin.site.register(Address, ResaleItensAdmin)
