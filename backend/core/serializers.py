
from rest_framework import serializers
from .models import Certification, CommitteeMember, CoreValue, Department, Doctor, Feature, HeroSlider,  DiagnosticTest, Milestone, PatientReport, PatientReview

class HeroSliderSerializer(serializers.ModelSerializer):
    imageUrl = serializers.ImageField(source='image', read_only=True)

    class Meta:
        model = HeroSlider
        fields = ['id', 'imageUrl', 'is_active']

class DiagnosticTestSerializer(serializers.ModelSerializer):
    # Mapping field names for clean API response
    id = serializers.CharField(source='test_id')
    nameEn = serializers.CharField(source='name_en')
    nameBn = serializers.CharField(source='name_bn')
    timeEn = serializers.CharField(source='time_en')
    timeBn = serializers.CharField(source='time_bn')
    prepEn = serializers.CharField(source='prep_en')
    prepBn = serializers.CharField(source='prep_bn')
    descEn = serializers.CharField(source='desc_en')
    descBn = serializers.CharField(source='desc_bn')
    homeSample = serializers.BooleanField(source='home_sample')

    class Meta:
        model = DiagnosticTest
        fields = [
            'id', 'category', 'homeSample',
            'nameEn', 'nameBn',
            'timeEn', 'timeBn',
            'prepEn', 'prepBn',
            'descEn', 'descBn'
        ]


class PatientReportSerializer(serializers.ModelSerializer):
    patientNameEn = serializers.CharField(source='patient_name_en')
    patientNameBn = serializers.CharField(source='patient_name_bn')
    invoiceNo = serializers.CharField(source='invoice_no')
    testNameEn = serializers.CharField(source='test_name_en')
    testNameBn = serializers.CharField(source='test_name_bn')
    statusEn = serializers.CharField(source='status_en')
    statusBn = serializers.CharField(source='status_bn')
    doctorEn = serializers.CharField(source='doctor_en')
    doctorBn = serializers.CharField(source='doctor_bn')
    downloadUrl = serializers.FileField(source='report_file', read_only=True)

    class Meta:
        model = PatientReport
        fields = [
            'invoiceNo', 'date', 'downloadUrl',
            'patientNameEn', 'patientNameBn',
            'testNameEn', 'testNameBn',
            'statusEn', 'statusBn',
            'doctorEn', 'doctorBn'
        ]


class DoctorSerializer(serializers.ModelSerializer):
    departmentName = serializers.CharField(source='department.name_en', read_only=True)

    class Meta:
        model = Doctor
        fields = [
            'id', 'name_bn', 'name_en', 'degrees_bn', 'degrees_en',
            'designation_bn', 'designation_en', 'chamber_time_bn',
            'chamber_time_en', 'image', 'is_active', 'phone', 'departmentName'
        ]

class DepartmentSerializer(serializers.ModelSerializer):
    doctors = DoctorSerializer(many=True, read_only=True)

    class Meta:
        model = Department
        fields = ['id', 'name_bn', 'name_en', 'icon', 'description_bn', 'description_en', 'doctors']

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = '__all__'

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'

class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = '__all__'

class CommitteeMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommitteeMember
        fields = '__all__'

class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = '__all__'

class PatientReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientReview
        fields = '__all__'