from rest_framework import generics
from .models import HeroSlide
from .serializers import HeroSlideSerializer

# ফ্রন্টএন্ডের জন্য শুধুমাত্র এক্টিভ স্লাইডগুলো পাওয়ার API
class ActiveHeroSlideListView(generics.ListAPIView):
    serializer_class = HeroSlideSerializer

    def get_queryset(self):
        return HeroSlide.objects.filter(is_active=True)