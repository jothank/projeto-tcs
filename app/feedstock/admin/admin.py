from django.contrib import admin
from app.feedstock.models.models import Feedstock

@admin.register(Feedstock)
class FeedstockAdmin(admin.ModelAdmin):
    list_display = ('name',)
    filter_horizontal = ('units',)
