"""
Company admin
"""
###
# Libraries
###
from django.contrib import admin
from app.company.models.company import Company
from app.company.models.company_user import CompanyUser

###
# Inline Admin Models
###


###
# Main Admin Models
###

class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'cnpj', 'phone', 'email', 'street', 'number',
                    'neighborhood', 'city', 'state', 'country', 'zipcode',)


class CompanyUserAdmin(admin.ModelAdmin):
    list_display = ('company', 'user', 'is_owner',)


admin.site.register(Company, CompanyAdmin)
admin.site.register(CompanyUser, CompanyUserAdmin)
