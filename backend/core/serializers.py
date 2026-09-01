from rest_framework import serializers
from .models import HeroSlide

class HeroSlideSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()

    class Meta:
        model = HeroSlide
        fields = ['id', 'imageUrl', 'order', 'is_active']

    def get_imageUrl(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None