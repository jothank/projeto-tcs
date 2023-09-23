"""
feedstock admin
"""
###
# Libraries
###
from django.contrib import admin
from app.feedstock.models.feedstock import feedstock


###
# Inline Admin Models
###


###
# Main Admin Models
###
class feedstockAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'unit', 'price',)


admin.site.register(feedstock, feedstockAdmin)
