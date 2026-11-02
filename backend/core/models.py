from django.db import models

class HeroSlider(models.Model):
    image = models.ImageField(upload_to='hero_sliders/', help_text="Upload Hero Banner Image")
    is_active = models.BooleanField(default=True, help_text="Toggle to show/hide on website")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Slide {self.id} - ({'Active' if self.is_active else 'Inactive'})"


class DiagnosticTest(models.Model):
    CATEGORY_CHOICES = [
        ('HAEMATOLOGY', 'HAEMATOLOGY'),
        ('SEROLOGY', 'SEROLOGY'),
        ('URINE EXAM', 'URINE EXAM'),
        ('BIOCHEMICAL ANALYSIS', 'BIOCHEMICAL ANALYSIS'),
        ('HORMONE PANNEL', 'HORMONE PANNEL'),
        ('ULTRASOUND IMAGING', 'ULTRASOUND IMAGING'),
        ('STOOL EXAM', 'STOOL EXAM'),
        ('CARDIAC IMAGINE', 'CARDIAC IMAGINE'),
        ('DIGITAL X-RAY', 'DIGITAL X-RAY'),
    ]

    test_id = models.CharField(max_length=20, unique=True)
    
    # English Fields
    name_en = models.CharField(max_length=255, verbose_name="Test Name (English)")
    time_en = models.CharField(max_length=100, verbose_name="Report Time (English)", help_text="e.g. 6 Hours or Same Day")
    prep_en = models.CharField(max_length=255, verbose_name="Preparation Guide (English)", help_text="e.g. Fasting 8-10 hrs")
    desc_en = models.TextField(blank=True, null=True, verbose_name="Description (English)")

    # Bengali Fields
    name_bn = models.CharField(max_length=255, verbose_name="Test Name (Bengali)")
    time_bn = models.CharField(max_length=100, verbose_name="Report Time (Bengali)", help_text="যেমন: ৬ ঘণ্টা বা একই দিনে")
    prep_bn = models.CharField(max_length=255, verbose_name="Preparation Guide (Bengali)", help_text="যেমন: ৮-১০ ঘণ্টা খালি পেটে থাকতে হবে")
    desc_bn = models.TextField(blank=True, null=True, verbose_name="Description (Bengali)")

    # Common Fields
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    home_sample = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name_en} / {self.name_bn} ({self.category})"


class PatientReport(models.Model):
    # Patient info
    patient_name_en = models.CharField(max_length=255, verbose_name="Patient Name (English)")
    patient_name_bn = models.CharField(max_length=255, blank=True, null=True, verbose_name="Patient Name (Bengali)")
    
    invoice_no = models.CharField(max_length=100, unique=True)
    mobile_no = models.CharField(max_length=15)
    
    # Test details
    test_name_en = models.CharField(max_length=255, verbose_name="Test Name (English)")
    test_name_bn = models.CharField(max_length=255, blank=True, null=True, verbose_name="Test Name (Bengali)")
    
    date = models.DateField(auto_now_add=True)
    
    # Status (English & Bengali)
    status_en = models.CharField(max_length=50, default='Ready for Download', verbose_name="Status (English)")
    status_bn = models.CharField(max_length=50, default='ডাউনলোডের জন্য প্রস্তুত', verbose_name="Status (Bengali)")
    
    # Doctor info
    doctor_en = models.CharField(max_length=255, verbose_name="Signatory Doctor (English)")
    doctor_bn = models.CharField(max_length=255, blank=True, null=True, verbose_name="Signatory Doctor (Bengali)")
    
    report_file = models.FileField(upload_to='reports_pdf/')

    def __str__(self):
        return f"{self.invoice_no} - {self.patient_name_en}"


class Department(models.Model):
    name_bn = models.CharField(max_length=255)  # e.g. অর্থোপেডিক কনসালটেন্ট ও ট্রমা সার্জন
    name_en = models.CharField(max_length=255)  # e.g. Orthopedic Consultant and Trauma Surgeon
    icon = models.CharField(max_length=100, default='Stethoscope', help_text="Lucide Icon name")
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name_en


class Doctor(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='doctors')
    name_bn = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255)
    degrees_bn = models.TextField()
    degrees_en = models.TextField()
    designation_bn = models.TextField(blank=True, null=True)
    designation_en = models.TextField(blank=True, null=True)
    chamber_time_bn = models.CharField(max_length=255)
    chamber_time_en = models.CharField(max_length=255)
    image = models.ImageField(upload_to='doctors/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    phone = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name_en


class Feature(models.Model):
    title_en = models.CharField(max_length=255)
    title_bn = models.CharField(max_length=255)

    def __str__(self):
        return self.title_en

class Certification(models.Model):
    title_en = models.CharField(max_length=255)
    title_bn = models.CharField(max_length=255)
    org_en = models.CharField(max_length=255)
    org_bn = models.CharField(max_length=255)
    desc_en = models.TextField()
    desc_bn = models.TextField()

    def __str__(self):
        return self.title_en

class Milestone(models.Model):
    year_en = models.CharField(max_length=20)
    year_bn = models.CharField(max_length=20)
    title_en = models.CharField(max_length=255)
    title_bn = models.CharField(max_length=255)
    desc_en = models.TextField()
    desc_bn = models.TextField()

    def __str__(self):
        return f"{self.year_en} - {self.title_en}"

class CommitteeMember(models.Model):
    name_en = models.CharField(max_length=255)
    name_bn = models.CharField(max_length=255)
    role_en = models.CharField(max_length=255)
    role_bn = models.CharField(max_length=255)
    degree_en = models.CharField(max_length=255)
    degree_bn = models.CharField(max_length=255)
    image = models.ImageField(upload_to='committee/', blank=True, null=True)

    def __str__(self):
        return self.name_en

class CoreValue(models.Model):
    title_en = models.CharField(max_length=255)
    title_bn = models.CharField(max_length=255)
    desc_en = models.TextField()
    desc_bn = models.TextField()
    icon_type = models.CharField(max_length=50, default='ShieldCheck', help_text="Icons: ShieldCheck, Heart, Zap, Lightbulb")
    color_gradient = models.CharField(max_length=100, default='from-emerald-500 to-teal-600')

    def __str__(self):
        return self.title_en

class PatientReview(models.Model):
    name_en = models.CharField(max_length=255)
    name_bn = models.CharField(max_length=255)
    service_en = models.CharField(max_length=255)
    service_bn = models.CharField(max_length=255)
    review_en = models.TextField()
    review_bn = models.TextField()
    rating = models.IntegerField(default=5)
    date_en = models.CharField(max_length=100)
    date_bn = models.CharField(max_length=100)

    def __str__(self):
        return self.name_en