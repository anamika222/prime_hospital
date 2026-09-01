from django.urls import path
from .views import ActiveHeroSlideListView

urlpatterns = [
    path('api/hero-slides/', ActiveHeroSlideListView.as_view(), name='hero-slide-list'),
]