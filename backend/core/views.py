from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import Certification, CommitteeMember, CoreValue, Department, DiagnosticTest, Doctor, Feature, HeroSlider, Milestone, PatientReport, PatientReview
from .serializers import AppointmentSerializer, CertificationSerializer, CommitteeMemberSerializer, CoreValueSerializer, DepartmentSerializer, DoctorSerializer, DiagnosticTestSerializer, FeatureSerializer, HeroSliderSerializer, MilestoneSerializer, PatientReportSerializer, PatientReviewSerializer

# ফ্রন্টএন্ডের জন্য শুধুমাত্র এক্টিভ স্লাইডগুলো পাওয়ার API
class HeroSliderListView(generics.ListAPIView):
    queryset = HeroSlider.objects.filter(is_active=True)
    serializer_class = HeroSliderSerializer
# List all diagnostic tests (Admin panel input based)
class DiagnosticTestListView(generics.ListAPIView):
    queryset = DiagnosticTest.objects.all()
    serializer_class = DiagnosticTestSerializer


class PatientReportSearchAPIView(APIView):
    def post(self, request):
        patient_id = request.data.get('patientId')
        mobile_no = request.data.get('mobileNo')

        if not patient_id or not mobile_no:
            return Response(
                {'error': 'Invoice No and Mobile Number are required.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            report = PatientReport.objects.get(invoice_no__iexact=patient_id.strip(), mobile_no=mobile_no.strip())
            serializer = PatientReportSerializer(report)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except PatientReport.DoesNotExist:
            return Response(
                {'error': 'No report found matching these details.'}, 
                status=status.HTTP_404_NOT_FOUND
            )
class DepartmentListView(generics.ListAPIView):
    queryset = Department.objects.prefetch_related('doctors').all()
    serializer_class = DepartmentSerializer

class DoctorListView(generics.ListAPIView):
    queryset = Doctor.objects.filter(is_active=True)
    serializer_class = DoctorSerializer

class AboutPageDataView(APIView):
    def get(self, request):
        features = Feature.objects.all()
        certifications = Certification.objects.all()
        milestones = Milestone.objects.all()
        committee = CommitteeMember.objects.all()
        core_values = CoreValue.objects.all()
        reviews = PatientReview.objects.all()

        data = {
            "features": FeatureSerializer(features, many=True).data,
            "certifications": CertificationSerializer(certifications, many=True).data,
            "milestones": MilestoneSerializer(milestones, many=True).data,
            "committee": CommitteeMemberSerializer(committee, many=True, context={'request': request}).data,
            "core_values": CoreValueSerializer(core_values, many=True).data,
            "reviews": PatientReviewSerializer(reviews, many=True).data,
        }
        return Response(data)
@api_view(['POST'])
def create_appointment(request):
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)