from django.contrib import admin
from app.feedstock.models.models import feedstock

@admin.register(feedstock)
class feedstockAdmin(admin.ModelAdmin):
    list_display = ('name',)
    filter_horizontal = ('units',)
