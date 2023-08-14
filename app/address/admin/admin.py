from django.contrib import admin
from app.address.models.address import address



class AddressAdmin(admin.ModelAdmin):
    list_display = ('street', 'number', 'complement', 'neighborhood', 'city', 'state', 'country', 'zipcode', )
    search_fields = ('street', 'number', 'complement', 'neighborhood', 'city', 'state', 'country', 'zipcode', )
    list_filter = ('street', 'number', 'complement', 'neighborhood', 'city', 'state', 'country', 'zipcode', )


admin.site.register(address, AddressAdmin)