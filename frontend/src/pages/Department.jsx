import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
    Activity, 
    Stethoscope, 
    HeartPulse, 
    Brain, 
    Wind, 
    Users, 
    ArrowRight, 
    CheckCircle2, 
    Calendar, 
    Search, 
    ChevronDown, 
    Quote, 
    HelpCircle, 
    Microscope, 
    ShieldCheck, 
    Clock,
    Baby,
    Sparkles,
    PhoneCall
} from 'lucide-react';

const DEPARTMENTS = [
    {
        id: 'orthopedics',
        name: 'Orthopedics & Traumatology',
        shortName: 'Orthopedics',
        icon: Activity,
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
        tagline: 'Advanced Bone, Joint & Spine Care',
        description: 'Providing comprehensive care for musculoskeletal conditions, bone fractures, joint replacements, and sports injuries using minimally invasive procedures.',
        features: ['Joint Replacement Surgery', 'Complex Fracture Management', 'Sports Injury Rehabilitation', 'Spine & Disc Treatments'],
        facilities: ['Modular OT', 'Digital X-Ray', '3D CT Scan', 'Physio Rehab'],
        symptoms: ['Joint Pain', 'Bone Fracture', 'Back Pain', 'Sports Injury'],
        doctors: [
            { name: 'Dr. Rafiqul Islam', title: 'Senior Orthopedic Surgeon', degree: 'MBBS, MS (Orthopedics)', exp: '15+ Yrs Exp', time: 'Sat - Wed (4 PM - 8 PM)' },
            { name: 'Dr. Farhana Ahmed', title: 'Joint Replacement Specialist', degree: 'MBBS, FCPS (Orthopedics)', exp: '12+ Yrs Exp', time: 'Sun - Thu (10 AM - 2 PM)' }
        ],
        faq: [
            { q: 'How long does joint replacement recovery take?', a: 'Most patients start walking with support within 24-48 hours and achieve full recovery in 4 to 6 weeks.' }
        ]
    },
    {
        id: 'surgery',
        name: 'General & Laparoscopic Surgery',
        shortName: 'Surgery',
        icon: Stethoscope,
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
        tagline: 'Precision Surgical Treatments',
        description: 'Equipped with ultra-modern operation theaters to perform complex general surgeries and state-of-the-art keyhole (laparoscopic) procedures.',
        features: ['Laparoscopic Cholecystectomy', 'Hernia & Appendix Repair', 'Trauma & Emergency Surgery', 'Post-Operative Intensive Care'],
        facilities: ['Laparoscopic Suite', '24/7 Surgical ICU', 'Laser Surgery Center'],
        symptoms: ['Abdominal Pain', 'Hernia', 'Gallbladder Stones', 'Appendicitis'],
        doctors: [
            { name: 'Prof. Dr. Mahmud Hasan', title: 'Chief Laparoscopic Surgeon', degree: 'MBBS, FCPS, FRCS (Edin)', exp: '20+ Yrs Exp', time: 'Everyday (5 PM - 9 PM)' }
        ],
        faq: [
            { q: 'What are the benefits of laparoscopic surgery?', a: 'Smaller incisions, less pain, minimal scarring, and much faster recovery compared to open surgery.' }
        ]
    },
    {
        id: 'gynecology',
        name: 'Gynecology & Obstetrics',
        shortName: 'Gynecology',
        icon: Baby,
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
        tagline: 'Complete Women & Maternity Care',
        description: 'Dedicated to women’s health across all stages of life, offering comprehensive prenatal care, high-risk delivery management, and gynecological surgeries.',
        features: ['High-Risk Pregnancy Care', 'PCOS & Fertility Treatments', 'Painless Delivery Options', 'Advanced Laparoscopic Gynae Surgery'],
        facilities: ['Labor & Delivery OT', 'NICU Facility', '4D Pregnancy Ultrasound'],
        symptoms: ['Pregnancy Care', 'Irregular Periods', 'PCOS', 'Pelvic Pain'],
        doctors: [
            { name: 'Dr. Nasreen Sultana', title: 'Consultant Gynecologist', degree: 'MBBS, FCPS (OBGYN)', exp: '14+ Yrs Exp', time: 'Sat - Wed (11 AM - 4 PM)' }
        ],
        faq: [
            { q: 'Do you offer 24/7 maternity services?', a: 'Yes, our labor unit and delivery surgeons are available 24/7 for normal and emergency deliveries.' }
        ]
    },
    {
        id: 'cardiology',
        name: 'Cardiology & Heart Care',
        shortName: 'Cardiology',
        icon: HeartPulse,
        image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800',
        tagline: 'Advanced Cardiovascular Medicine',
        description: 'Providing specialized diagnostic and therapeutic care for heart diseases, hypertension, and arrhythmia with 24/7 emergency cardiac support.',
        features: ['Color Doppler & Echocardiogram', '24/7 Cardiac Emergency Unit', 'Hypertension & Lipid Care', 'Post-Cardiac Rehabilitation'],
        facilities: ['Cath Lab Unit', '24/7 CCU', 'ECG & Holter Monitor'],
        symptoms: ['Chest Pain', 'High Blood Pressure', 'Shortness of Breath', 'Palpitations'],
        doctors: [
            { name: 'Dr. Tanvir Rahman', title: 'Interventional Cardiologist', degree: 'MBBS, MD (Cardiology)', exp: '16+ Yrs Exp', time: 'Sat - Thu (3 PM - 7 PM)' }
        ],
        faq: [
            { q: 'When should I seek immediate cardiac emergency care?', a: 'Severe chest tightness radiating to the arm or jaw, accompanied by sweating and breathlessness requires immediate ER care.' }
        ]
    },
    {
        id: 'internal-medicine',
        name: 'Internal Medicine',
        shortName: 'Internal Medicine',
        icon: Stethoscope,
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
        tagline: 'Comprehensive Adult Healthcare',
        description: 'Focusing on the prevention, diagnosis, and non-surgical treatment of complex chronic diseases, lifestyle disorders, and multi-organ conditions.',
        features: ['Diabetes & Thyroid Management', 'Infectious Disease Care', 'Chronic Kidney & Liver Support', 'Comprehensive Health Screening'],
        facilities: ['Advanced Biochemistry Lab', 'Diabetes Care Cell', 'Isolation Ward'],
        symptoms: ['Fever & Infection', 'Diabetes Control', 'Thyroid Issues', 'Chronic Fatigue'],
        doctors: [
            { name: 'Dr. Kamrul Ahsan', title: 'Internal Medicine Specialist', degree: 'MBBS, FCPS (Medicine)', exp: '18+ Yrs Exp', time: 'Everyday (10 AM - 1 PM)' }
        ],
        faq: [
            { q: 'How often should adults get a comprehensive health checkup?', a: 'Adults above 35 should get an annual routine health checkup for early detection of lifestyle diseases.' }
        ]
    },
    {
        id: 'neurosurgery',
        name: 'Neurosurgery & Neurology',
        shortName: 'Neurosurgery',
        icon: Brain,
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
        tagline: 'Expert Brain & Nerve Care',
        description: 'Offering cutting-edge surgical and medical treatments for disorders affecting the brain, spinal cord, peripheral nerves, and stroke management.',
        features: ['Brain Tumor Surgery', 'Spinal Cord & Disc Reconstruction', 'Stroke Intervention Unit', 'Epilepsy & Migraine Management'],
        facilities: ['Neuro-ICU', 'High-End MRI Suite', 'Neuro Electrophysiology'],
        symptoms: ['Severe Migraine', 'Numbness/Paralysis', 'Seizures', 'Spine Injury'],
        doctors: [
            { name: 'Dr. Asif Chowdhury', title: 'Senior Neurosurgeon', degree: 'MBBS, MS (Neurosurgery)', exp: '13+ Yrs Exp', time: 'Sun - Thu (5 PM - 8 PM)' }
        ],
        faq: [
            { q: 'What is the window period for emergency stroke care?', a: 'Treatment within the first 3 to 4.5 hours of stroke onset is crucial to minimize permanent brain damage.' }
        ]
    },
    {
        id: 'pulmonology',
        name: 'Pulmonology & Respiratory',
        shortName: 'Pulmonology',
        icon: Wind,
        image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800',
        tagline: 'Chest & Lung Health Management',
        description: 'Specialized in treating respiratory disorders, asthma, chronic obstructive pulmonary disease (COPD), and lung infections with modern diagnostics.',
        features: ['Asthma & Allergy Care', 'COPD & Emphysema Management', 'Sleep Apnea Diagnosis', 'Bronchoscopy & Pulmonary Tests'],
        facilities: ['Spirometry Lab', 'Bronchoscopy OT', 'Respiratory ICU'],
        symptoms: ['Chronic Cough', 'Asthma Attack', 'Breathing Difficulty', 'Sleep Apnea'],
        doctors: [
            { name: 'Dr. Shahriar Alam', title: 'Chest & Lung Specialist', degree: 'MBBS, DTCD, MD (Pulmonology)', exp: '11+ Yrs Exp', time: 'Sat - Wed (6 PM - 9 PM)' }
        ],
        faq: [
            { q: 'Can chronic asthma be cured?', a: 'While asthma cannot be completely cured, it can be 100% controlled with proper medications and lifestyle adjustments.' }
        ]
    }
];

const TESTIMONIALS = [
    { name: 'Sharmin Akter', dept: 'Gynecology', comment: 'The maternity team and doctors were exceptionally caring during my high-risk delivery.' },
    { name: 'Tariqul Islam', dept: 'Orthopedics', comment: 'Had my knee replacement surgery here. I am walking pain-free again within a month!' },
    { name: 'Kabir Hossain', dept: 'Cardiology', comment: 'Prompt emergency cardiac intervention saved my father. Eternally grateful to the team.' }
];

const STATS = [
    { label: 'Specialized Depts', value: '12+' },
    { label: 'Expert Doctors', value: '45+' },
    { label: 'Successful Surgeries', value: '10k+' },
    { label: 'Emergency Support', value: '24/7' },
];

const getDoctorInitial = (name) => {
    const cleaned = name.replace(/^(Prof\.|Dr\.|Mr\.|Mrs\.|Ms\.)\s+/g, '');
    return cleaned.charAt(0) || 'D';
};

export default function Department() {
    const { hash } = useLocation();
    const [activeTab, setActiveTab] = useState('');
    const [selectedSymptom, setSelectedSymptom] = useState('');
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const scrollToDepartment = (id) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -110;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (hash) {
            const targetId = hash.replace('#', '');
            scrollToDepartment(targetId);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [hash]);

    const handleSymptomSelect = (e) => {
        const deptId = e.target.value;
        setSelectedSymptom(deptId);
        if (deptId) {
            scrollToDepartment(deptId);
        }
    };

    return (
        <div className="min-h-screen bg-[#004d26]/5 pb-20 font-sans">
            {/* HERO BANNER WITH IMAGE DUAL COLOR PALETTE (#007A3D & #97D739) */}
            <section className="bg-gradient-to-br from-[#00381b] via-[#007A3D] to-[#004d26] text-white py-20 px-4 sm:px-8 relative overflow-hidden w-full">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#97D739]/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#97D739]/15 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none animate-pulse"></div>
                
                <div className="w-full text-center relative z-10 animate-fade-in max-w-6xl mx-auto">
                    <span className="inline-flex items-center gap-2 bg-[#97D739] text-[#00381b] text-xs sm:text-sm font-black uppercase tracking-widest px-5 py-2.5 rounded-full mb-6 shadow-lg transition-all hover:scale-105 duration-300">
                        <Sparkles size={16} className="animate-spin text-[#00381b]" style={{ animationDuration: '6s' }} /> World-Class Healthcare Standards
                    </span>
                    <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight drop-shadow-md">
                        Our Specialized Departments
                    </h1>
                    <p className="text-[#86EFAC] text-base sm:text-xl max-w-4xl mx-auto leading-relaxed font-medium">
                        Explore our centers of excellence equipped with state-of-the-art technology, multi-specialty operation theaters, and top medical consultants.
                    </p>

                    {/* STATS SHOWCASE */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mx-auto mt-12">
                        {STATS.map((stat, i) => (
                            <div key={i} className="bg-[#00381b]/60 border border-[#97D739]/40 p-5 rounded-2xl text-center hover:bg-[#007A3D] hover:border-[#97D739] hover:-translate-y-1 transition-all duration-300 cursor-default shadow-md">
                                <div className="text-3xl sm:text-4xl font-black text-[#97D739]">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-slate-100 font-semibold mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* SYMPTOM SEARCH BAR */}
                    <div className="mt-10 w-full max-w-2xl mx-auto bg-white p-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border-2 border-[#97D739] focus-within:ring-4 focus-within:ring-[#97D739]/40 transition-all duration-300">
                        <Search size={22} className="text-[#007A3D] ml-3 shrink-0" />
                        <select 
                            value={selectedSymptom} 
                            onChange={handleSymptomSelect}
                            className="w-full bg-transparent text-slate-800 font-bold text-xs sm:text-sm focus:outline-none cursor-pointer py-2"
                        >
                            <option value="">Need help finding a department? Select your symptom...</option>
                            {DEPARTMENTS.flatMap(d => d.symptoms.map(s => ({ symptom: s, deptId: d.id, deptName: d.shortName }))).map((item, idx) => (
                                <option key={`${item.deptId}-${idx}`} value={item.deptId}>
                                    Symptom: {item.symptom} → Go to {item.deptName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* FULL-SCREEN STICKY FILTER TABS */}
            <div className="sticky top-[72px] z-40 bg-[#007A3D] border-b-4 border-[#97D739] shadow-md py-3.5 px-4 sm:px-8 w-full">
                <div className="w-full flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth justify-start xl:justify-center">
                    {DEPARTMENTS.map((dept) => {
                        const IconComponent = dept.icon;
                        const isActive = activeTab === dept.id;
                        return (
                            <button
                                key={dept.id}
                                onClick={() => scrollToDepartment(dept.id)}
                                className={`whitespace-nowrap px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 flex items-center gap-2.5 ${
                                    isActive
                                        ? 'bg-[#97D739] text-[#00381b] shadow-xl scale-105 border-2 border-white'
                                        : 'bg-[#004d26] text-white hover:bg-[#97D739] hover:text-[#00381b] hover:scale-102'
                                }`}
                            >
                                <IconComponent size={18} className={`transition-transform duration-300 ${isActive ? 'rotate-12' : ''}`} />
                                <span>{dept.shortName}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* FULL SCREEN DEPARTMENT CARDS */}
            <div className="w-full px-4 sm:px-8 lg:px-12 mt-12 space-y-12">
                {DEPARTMENTS.map((dept) => {
                    const IconComponent = dept.icon;
                    return (
                        <div
                            key={dept.id}
                            id={dept.id}
                            className="w-full bg-white rounded-3xl border-2 border-[#007A3D]/20 shadow-md hover:shadow-2xl hover:border-[#007A3D] transition-all duration-500 overflow-hidden group"
                        >
                            <div className="p-6 sm:p-8 lg:p-10 border-b border-slate-100 flex flex-col lg:flex-row gap-8 lg:items-start justify-between">
                                
                                {/* DEPARTMENT IMAGE */}
                                <div className="w-full lg:w-96 h-64 lg:h-80 rounded-2xl overflow-hidden relative shrink-0 shadow-lg border-2 border-[#97D739]">
                                    <img 
                                        src={dept.image} 
                                        alt={dept.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#00381b]/80 via-transparent to-transparent opacity-90"></div>
                                    <span className="absolute bottom-4 left-4 bg-[#97D739] text-[#00381b] text-xs font-black px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                                        <Sparkles size={14} className="text-[#00381b]" /> Certified Center
                                    </span>
                                </div>

                                {/* DETAILS CONTENT */}
                                <div className="space-y-5 flex-1">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="p-4 rounded-2xl bg-[#007A3D] text-[#97D739] shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent size={32} />
                                        </div>
                                        <div>
                                            <span className="text-xs font-black text-[#007A3D] uppercase tracking-wider bg-[#97D739]/30 px-3 py-1 rounded-md border border-[#007A3D]/20">
                                                {dept.tagline}
                                            </span>
                                            <h2 className="text-2xl sm:text-4xl font-black text-[#00381b] mt-1">
                                                {dept.name}
                                            </h2>
                                        </div>
                                    </div>

                                    <p className="text-slate-700 text-base leading-relaxed font-medium">
                                        {dept.description}
                                    </p>

                                    <div className="pt-2">
                                        <h4 className="text-xs font-black uppercase tracking-wider text-[#007A3D] mb-3">
                                            Key Treatments & Services
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {dept.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-3 text-slate-800 text-sm font-bold bg-[#007A3D]/5 p-3 rounded-xl border border-[#007A3D]/10 hover:bg-[#97D739]/20 transition-colors duration-200">
                                                    <CheckCircle2 size={18} className="text-[#007A3D] shrink-0" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* SIDE CTA BOX */}
                                <div className="w-full lg:w-72 bg-gradient-to-b from-[#007A3D]/10 to-[#97D739]/10 p-6 rounded-2xl border-2 border-[#007A3D]/20 flex flex-col justify-between gap-6 shrink-0">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2.5 text-[#00381b] text-sm font-extrabold">
                                            <Users size={18} className="text-[#007A3D]" />
                                            <span>{dept.doctors.length}+ Senior Specialists</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                                            <Clock size={16} className="text-[#007A3D]" />
                                            <span>24/7 Emergency & OPD</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                                            <PhoneCall size={16} className="text-[#007A3D]" />
                                            <span>Helpline: +880 1700-000000</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2.5">
                                        <Link
                                            to="/appointment"
                                            className="w-full flex items-center justify-center gap-2 bg-[#007A3D] hover:bg-[#00381b] text-[#97D739] hover:text-white py-3.5 px-4 rounded-xl font-black text-sm shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                                        >
                                            <Calendar size={18} />
                                            <span>Book Appointment</span>
                                        </Link>
                                        
                                        <Link
                                            to="/contact"
                                            className="w-full flex items-center justify-center gap-1.5 text-[#007A3D] hover:text-[#00381b] py-2 text-xs font-black group/link transition-all"
                                        >
                                            <span>Enquire Specialist</span>
                                            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* FACILITIES BAR */}
                            <div className="bg-[#007A3D]/10 px-6 sm:px-10 py-4 border-b border-slate-100">
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="text-xs font-black uppercase tracking-wider text-[#00381b] flex items-center gap-2">
                                        <Microscope size={16} className="text-[#007A3D]" /> Advanced Tech & Facilities:
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {dept.facilities.map((fac, i) => (
                                            <span key={i} className="bg-white border border-[#007A3D]/30 text-[#00381b] text-xs px-3.5 py-1.5 rounded-lg font-black shadow-xs hover:bg-[#97D739] transition-colors duration-200 cursor-default">
                                                ⚡ {fac}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* DOCTORS LIST */}
                            <div className="p-6 sm:p-10 bg-white">
                                <h4 className="text-xs font-black uppercase tracking-wider text-[#007A3D] mb-6 flex items-center gap-2">
                                    <ShieldCheck size={20} className="text-[#007A3D]" /> Specialist Consultants & Schedule
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {dept.doctors.map((doc, dIdx) => (
                                        <div key={dIdx} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 hover:border-[#007A3D] hover:bg-[#97D739]/10 hover:shadow-md transition-all duration-300">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#007A3D] text-[#97D739] font-black flex items-center justify-center text-lg shrink-0">
                                                    {getDoctorInitial(doc.name)}
                                                </div>
                                                <div>
                                                    <h5 className="font-extrabold text-[#00381b] text-sm sm:text-base">{doc.name}</h5>
                                                    <p className="text-xs font-bold text-[#007A3D]">{doc.title}</p>
                                                    <p className="text-xs text-slate-600 font-medium">{doc.degree} • {doc.exp}</p>
                                                    <p className="text-xs font-bold text-slate-700 mt-1 flex items-center gap-1">
                                                        <Clock size={12} className="text-[#007A3D]" /> {doc.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <Link 
                                                to="/appointment" 
                                                className="px-3.5 py-2 bg-[#007A3D] text-[#97D739] font-black text-xs rounded-lg hover:bg-[#00381b] hover:text-white active:scale-95 transition-all duration-200 shrink-0"
                                            >
                                                Book
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* TESTIMONIALS */}
            <section className="w-full px-4 sm:px-8 lg:px-12 mt-20">
                <div className="text-center mb-10">
                    <span className="text-xs font-black uppercase tracking-widest text-[#007A3D] bg-[#97D739]/30 px-3 py-1 rounded-md">Patient Success Stories</span>
                    <h2 className="text-2xl sm:text-4xl font-black text-[#00381b] mt-2">What Our Patients Say</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {TESTIMONIALS.map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border-2 border-[#007A3D]/20 shadow-sm relative space-y-3 hover:-translate-y-1.5 hover:border-[#007A3D] transition-all duration-300">
                            <Quote size={32} className="text-[#97D739] absolute top-4 right-4" />
                            <p className="text-slate-700 text-sm leading-relaxed font-medium italic">"{item.comment}"</p>
                            <div className="pt-3 border-t border-slate-100">
                                <h4 className="font-extrabold text-[#00381b] text-sm">{item.name}</h4>
                                <span className="text-xs text-[#007A3D] font-bold">{item.dept} Patient</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="w-full px-4 sm:px-8 lg:px-12 mt-20 max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-xs font-black uppercase tracking-widest text-[#007A3D] bg-[#97D739]/30 px-3 py-1 rounded-md">Help Center</span>
                    <h2 className="text-2xl sm:text-4xl font-black text-[#00381b] mt-2">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {DEPARTMENTS.flatMap(d => d.faq).map((faqItem, fIdx) => (
                        <div key={`${faqItem.q}-${fIdx}`} className="bg-white rounded-2xl border-2 border-[#007A3D]/20 overflow-hidden shadow-xs transition-all duration-300">
                            <button
                                onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                                className="w-full text-left p-5 flex items-center justify-between gap-4 font-extrabold text-[#00381b] hover:text-[#007A3D] transition duration-200"
                            >
                                <span className="flex items-center gap-3 text-sm sm:text-base">
                                    <HelpCircle size={20} className="text-[#007A3D] shrink-0" />
                                    {faqItem.q}
                                </span>
                                <ChevronDown size={20} className={`transition-transform duration-300 shrink-0 text-[#007A3D] ${openFaqIndex === fIdx ? 'rotate-180' : ''}`} />
                            </button>
                            {openFaqIndex === fIdx && (
                                <div className="px-5 pb-5 pt-0 text-slate-700 text-sm font-medium leading-relaxed border-t border-slate-100 animate-fade-in">
                                    {faqItem.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}