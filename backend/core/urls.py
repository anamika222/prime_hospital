from django.contrib.admin import views
from django.urls import path
from .views import AboutPageDataView, DiagnosticTestListView, HeroSliderListView, PatientReportSearchAPIView

urlpatterns = [
    path('hero-sliders/', HeroSliderListView.as_view(), name='hero-slider-list'),
    path('tests/', DiagnosticTestListView.as_view(), name='test-list'),
    path('reports/download/', PatientReportSearchAPIView.as_view(), name='report-download'),
    path('about/', AboutPageDataView.as_view(), name='about-data'),
    path('departments/', views.DepartmentListView.as_view(), name='department-list'),
    path('doctors/', views.DoctorListView.as_view(), name='doctor-list'),
]