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
    list_display = ('name',)


admin.site.register(Feedstock, FeedstockAdmin)
