"""
Feedstock admin
"""
###
# Libs
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
    list_display = ('name', 'quantity', 'unit', 'price',)


admin.site.register(Feedstock, FeedstockAdmin)
