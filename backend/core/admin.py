from django.contrib import admin
from django.utils.html import format_html
from .models import HeroSlide

@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('preview_image', 'order', 'is_active', 'created_at')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active', 'created_at')
  

    def preview_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 80px; height: 45px; object-fit: cover; border-radius: 4px;" />', obj.image.url)
        return "No Image"

    preview_image.short_description = 'Preview'