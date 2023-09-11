from django.contrib import admin
from app.company.models.company import Company



class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'cnpj', 'phone', 'email','street', 'number', 'neighborhood', 'city', 'state',  'zipcode',  )
    search_fields = ('name', 'cnpj', 'phone', 'email','street', 'number', 'neighborhood', 'city', 'state',  'zipcode',  )
    list_filter = ('name', 'cnpj', 'phone', 'email','street', 'number', 'neighborhood', 'city', 'state',  'zipcode',  )
    ordering = ('name', 'cnpj', 'phone', 'email','street', 'number', 'neighborhood', 'city', 'state',  'zipcode',  )

admin.site.register(Company, CompanyAdmin)