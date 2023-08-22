from django.contrib import admin
from app.company.models.company import Company



class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'cnpj', 'phone', 'email','street', 'number', 'complement', 'neighborhood', 'city', 'state', 'country', 'zipcode',  )
    search_fields = ('name', 'cnpj', 'phone', 'email','street', 'number', 'complement', 'neighborhood', 'city', 'state', 'country', 'zipcode',  )
    list_filter = ('name', 'cnpj', 'phone', 'email','street', 'number', 'complement', 'neighborhood', 'city', 'state', 'country', 'zipcode',  )
    ordering = ('name', 'cnpj', 'phone', 'email','street', 'number', 'complement', 'neighborhood', 'city', 'state', 'country', 'zipcode',  )

admin.site.register(Company, CompanyAdmin)