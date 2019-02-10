from django.contrib import admin
from .models import TruckGif


@admin.register(TruckGif)
class TruckGifAdmin(admin.ModelAdmin):
    list_display = [field.name for field in TruckGif._meta.fields]
    list_filter = []
    list_display_links = []
