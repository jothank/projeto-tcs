"""
Feedstock admin
"""
###
# Libraries
###
from django.contrib import admin
from app.feedstock.models.feedstock import Feedstock


###
# Inline Admin Models
###


###
# Main Admin Models
###
class FeedstockAdmin(admin.ModelAdmin):
    list_display = ('value', 'mass')
    search_fields = ('value', 'mass')
    list_filter = ('value', 'mass')


admin.site.register(Feedstock, FeedstockAdmin)
