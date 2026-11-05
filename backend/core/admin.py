from django.contrib import admin
from django.utils.html import format_html
from .models import Certification, CommitteeMember, CoreValue, Department, Doctor, DiagnosticTest, Feature, HeroSlider, Milestone, PatientReport, PatientReview

@admin.register(HeroSlider)
class HeroSliderAdmin(admin.ModelAdmin):
    list_display = ('id', 'image', 'is_active', 'created_at')
    list_filter = ('is_active',)
    list_editable = ('is_active',)

@admin.register(DiagnosticTest)
class DiagnosticTestAdmin(admin.ModelAdmin):
    list_display = ('test_id', 'name_en', 'name_bn', 'category', 'time_en', 'home_sample')
    list_filter = ('category', 'home_sample')
    search_fields = ('test_id', 'name_en', 'name_bn')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('test_id', 'category', 'home_sample')
        }),
        ('English Content', {
            'fields': ('name_en', 'time_en', 'prep_en', 'desc_en')
        }),
        ('Bengali Content', {
            'fields': ('name_bn', 'time_bn', 'prep_bn', 'desc_bn')
        }),
    )

@admin.register(PatientReport)
class PatientReportAdmin(admin.ModelAdmin):
    list_display = ('invoice_no', 'patient_name_en', 'mobile_no', 'status_en', 'date')
    search_fields = ('invoice_no', 'patient_name_en', 'patient_name_bn', 'mobile_no')
    list_filter = ('date',)

    fieldsets = (
        ('Report & Patient Verification', {
            'fields': ('invoice_no', 'mobile_no', 'report_file')
        }),
        ('English Information', {
            'fields': ('patient_name_en', 'test_name_en', 'doctor_en', 'status_en')
        }),
        ('Bengali Information', {
            'fields': ('patient_name_bn', 'test_name_bn', 'doctor_bn', 'status_bn')
        }),
    )

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_bn', 'icon')
    search_fields = ('name_en', 'name_bn')
    fields = ('name_en', 'name_bn', 'icon', 'description_en', 'description_bn')

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'department', 'is_active', 'phone')
    list_filter = ('department', 'is_active')
    search_fields = ('name_en', 'name_bn', 'degrees_en')

@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'title_bn')

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'org_en')

@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    list_display = ('year_en', 'title_en')

@admin.register(CommitteeMember)
class CommitteeMemberAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'role_en')

@admin.register(CoreValue)
class CoreValueAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'icon_type')

@admin.register(PatientReview)
class PatientReviewAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'rating')