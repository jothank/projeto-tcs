from django.contrib import admin
from app.company.models.company import Address


class ResaleItensAdmin(admin.ModelAdmin):
    ...


admin.site.register(Address, ResaleItensAdmin)
