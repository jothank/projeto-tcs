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
    list_display = ('unique_key', 'value', 'mass')
    search_fields = ('unique_key', 'value', 'mass')
    list_filter = ('unique_key', 'value', 'mass')


admin.site.register(Feedstock, FeedstockAdmin)
