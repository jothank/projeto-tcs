"""
Accounts admin
"""
###
# Libs
###
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from app.accounts.models.user import User


###
# Inline Admin Models
###


###
# Main Admin Models
###
class UserAdmin(BaseUserAdmin):
    list_display = ('id', 'email', 'username', 'is_active',
                    'last_login', 'date_joined')


admin.site.register(User, UserAdmin)
