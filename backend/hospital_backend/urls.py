from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')), # আপনার অ্যাপের নাম দিয়ে replace করুন
]

# মিডিয়া ফাইল (ইমেজ/স্লাইডার) দেখার ব্যবস্থা
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)