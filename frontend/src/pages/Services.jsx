import React, { useState } from 'react';
import { 
    Truck, 
    Stethoscope, 
    Building2, 
    Activity, 
    HeartPulse, 
    PackageCheck, 
    ArrowRight, 
    CheckCircle2, 
    PhoneCall, 
    Clock,
    ShieldAlert,
    Sparkles,
    X,
    ChevronRight,
    HelpCircle
} from 'lucide-react';

const CATEGORIES = ['All Services', 'Emergency & Critical', 'Outpatient & Inpatient', 'Surgery & OT', 'Packages'];

const SERVICES_DATA = [
    {
        id: 'emergency',
        category: 'Emergency & Critical',
        title: '24/7 Emergency & Ambulance',
        subtitle: 'Critical & Trauma Care',
        icon: Truck,
        badge: 'Instant Response',
        description: 'Our emergency department operates round-the-clock with dedicated trauma doctors, critical care specialists, and ICU-equipped ambulances.',
        features: [
            '24/7 ICU Ambulance Service with Oxygen Support',
            'Immediate Trauma & Cardiac Response Unit',
            'Dedicated Emergency Operation Theater',
            'On-call Senior Critical Care Specialists'
        ],
        details: 'Emergency Helpline: +880 1700-000000. Our mobile ICU unit carries defibrillators, portable ventilators, and trained emergency paramedics to handle life-threatening situations en route.',
        btnText: 'Emergency Call'
    },
    {
        id: 'opd',
        category: 'Outpatient & Inpatient',
        title: 'Outpatient Department (OPD)',
        subtitle: 'Specialist Consultations',
        icon: Stethoscope,
        badge: 'Top Specialists',
        description: 'Consult with top-rated specialists across 12+ medical disciplines with convenient online scheduling and minimal waiting time.',
        features: [
            '12+ Specialized Medical Departments',
            'Easy Online Serial & Time-Slot Booking',
            'Digital Prescription & Patient Medical History',
            'Spacious & Comfortable Waiting Lounges'
        ],
        details: 'OPD Hours: Everyday 8 AM - 10 PM. You can choose your preferred specialist, select convenient time slots, and view live serial updates on your phone.',
        btnText: 'Book OPD Appointment'
    },
    {
        id: 'ipd',
        category: 'Outpatient & Inpatient',
        title: 'Inpatient & Admission (IPD)',
        subtitle: 'Hospitalization & Cabin Care',
        icon: Building2,
        badge: '24/7 Care',
        description: 'Comprehensive inpatient facilities offering high-standard medical care, hygienic environment, and 24-hour nursing support.',
        features: [
            'VIP, Deluxe & Standard Air-Conditioned Cabins',
            'Clean & Hygienic General Wards',
            'In-house Pharmacy & Dietician Recommended Meals',
            '24/7 Attending Resident Medical Officers'
        ],
        details: 'We provide 24/7 room service, round-the-clock nursing care, and continuous monitoring to ensure a peaceful and fast recovery for admitted patients.',
        btnText: 'Explore IPD Cabins'
    },
    {
        id: 'ot',
        category: 'Surgery & OT',
        title: 'Modular Operation Theater (OT)',
        subtitle: 'Advanced Surgical Facilities',
        icon: Activity,
        badge: 'Ultra-Sterile',
        description: 'State-of-the-art sterile modular OTs equipped with HEPA filters and modern laparoscopic tools for precise surgical procedures.',
        features: [
            'Laparoscopic & Minimally Invasive Surgery',
            'Orthopedic & Complex Joint Replacement OT',
            'Zero-Infection HEPA Filter Air Technology',
            'Dedicated Post-Operative Recovery Ward'
        ],
        details: 'Our operation theaters meet international infection control standards, minimizing hospital-acquired infections and ensuring faster post-surgery healing.',
        btnText: 'Surgical Consultation'
    },
    {
        id: 'icu',
        category: 'Emergency & Critical',
        title: 'ICU, CCU & NICU Units',
        subtitle: 'Intensive Critical Care',
        icon: HeartPulse,
        badge: 'Life Support Ready',
        description: 'Advanced critical care units equipped with modern ventilators, multi-para monitors, and round-the-clock intensivist doctors.',
        features: [
            '24/7 Medical & Surgical ICU',
            'Dedicated Coronary Care Unit (CCU)',
            'Neonatal Intensive Care (NICU) for Newborns',
            'Central Oxygen & High-End Ventilator Support'
        ],
        details: 'Managed 1:1 by expert critical care nurses and full-time intensivists to provide continuous monitoring for high-risk patients.',
        btnText: 'Inquire Critical Bed'
    },
    {
        id: 'packages',
        category: 'Packages',
        title: 'Comprehensive Health Packages',
        subtitle: 'Preventive Healthcare',
        icon: PackageCheck,
        badge: 'Special Discount',
        description: 'Specially curated wellness and health screening packages designed for early detection of lifestyle diseases and vital organ checkups.',
        features: [
            'Executive Full Body Health Checkup',
            'Cardiac & Diabetic Risk Screening',
            'Comprehensive Women Care Package',
            'Senior Citizen Wellness Screening'
        ],
        details: 'Health packages include consultation with specialist doctors, comprehensive diagnostic tests, and detailed health report reviews.',
        btnText: 'View All Packages'
    }
];

export default function DynamicServicesPage() {
    const [selectedCategory, setSelectedCategory] = useState('All Services');
    const [activeModalData, setActiveModalData] = useState(null);

    // Filter logic
    const filteredServices = SERVICES_DATA.filter(service => 
        selectedCategory === 'All Services' || service.category === selectedCategory
    );

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 font-sans selection:bg-[#97D739] selection:text-[#00381b]">
            
            {/* HERO SECTION WITH ANIMATED GLOW */}
            <section className="relative py-20 px-4 sm:px-8 text-center overflow-hidden bg-gradient-to-b from-[#00381b] via-[#004d26] to-slate-900">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#97D739]/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

                <div className="max-w-4xl mx-auto relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-[#97D739]/20 border border-[#97D739]/40 text-[#97D739] text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
                        <Sparkles size={16} className="animate-spin text-[#97D739]" style={{ animationDuration: '4s' }} /> Next-Gen Clinical Excellence
                    </div>
                    
                    <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                        Our Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#86EFAC] to-[#97D739]">Medical Services</span>
                    </h1>
                    
                    <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Combining advanced medical technology with human empathy to deliver seamless healthcare solutions across all disciplines.
                    </p>
                </div>
            </section>

            {/* FLOATING EMERGENCY ALERT BAR */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-8 relative z-20">
                <div className="bg-gradient-to-r from-red-950 via-[#00381b] to-slate-900 border-2 border-red-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-red-600/30 border border-red-500 text-red-400 rounded-2xl animate-bounce">
                            <ShieldAlert size={28} />
                        </div>
                        <div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-red-400">Emergency Support 24/7</span>
                            <h3 className="font-extrabold text-base sm:text-lg text-white">Need Immediate Ambulance or Trauma Care?</h3>
                        </div>
                    </div>
                    <a 
                        href="tel:+8801700000000" 
                        className="bg-red-600 hover:bg-red-500 text-white px-6 py-3.5 rounded-xl font-black text-sm flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95 shrink-0"
                    >
                        <PhoneCall size={18} />
                        <span>Call +880 1700-000000</span>
                    </a>
                </div>
            </div>

            {/* DYNAMIC CATEGORY FILTER TABS */}
            <div className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-4 px-4 mt-12">
                <div className="max-w-6xl mx-auto flex gap-3 overflow-x-auto no-scrollbar justify-start md:justify-center">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${
                                selectedCategory === cat
                                    ? 'bg-[#97D739] text-[#00381b] shadow-lg shadow-[#97D739]/20 scale-105'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* SERVICES CARDS GRID */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((srv) => {
                        const IconComponent = srv.icon;
                        return (
                            <div 
                                key={srv.id} 
                                className="bg-slate-800/80 border border-slate-700 hover:border-[#97D739] rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#97D739]/10 flex flex-col justify-between group relative overflow-hidden"
                            >
                                {/* CARD GLOW EFFECT ON HOVER */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#97D739]/10 rounded-full blur-2xl group-hover:bg-[#97D739]/30 transition-all duration-500 pointer-events-none"></div>

                                <div>
                                    {/* TOP BADGES */}
                                    <div className="flex items-center justify-between gap-2 mb-6">
                                        <div className="p-3.5 rounded-2xl bg-[#007A3D] text-[#97D739] border border-[#97D739]/30 group-hover:rotate-6 transition-transform duration-300">
                                            <IconComponent size={28} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase text-[#00381b] bg-[#97D739] px-3 py-1 rounded-full shadow-md">
                                            {srv.badge}
                                        </span>
                                    </div>

                                    <span className="text-[11px] font-black uppercase text-[#86EFAC] tracking-wider block">
                                        {srv.subtitle}
                                    </span>
                                    <h3 className="text-xl font-black text-white mt-1 mb-3 group-hover:text-[#97D739] transition-colors">
                                        {srv.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mb-6">
                                        {srv.description}
                                    </p>

                                    {/* FEATURE LIST */}
                                    <div className="space-y-2.5 border-t border-slate-700/60 pt-4 mb-8">
                                        {srv.features.map((feat, idx) => (
                                            <div key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-200">
                                                <CheckCircle2 size={16} className="text-[#97D739] shrink-0 mt-0.5" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="space-y-2">
                                    <button 
                                        onClick={() => setActiveModalData(srv)}
                                        className="w-full bg-[#007A3D] hover:bg-[#004d26] text-[#86EFAC] hover:text-white py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all border border-[#007A3D]"
                                    >
                                        <HelpCircle size={14} />
                                        <span>Details & Information</span>
                                    </button>

                                    <button 
                                        className="w-full bg-[#97D739] hover:bg-white text-[#00381b] py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md group/btn"
                                    >
                                        <span>{srv.btnText}</span>
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* DYNAMIC POPUP MODAL */}
            {activeModalData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-slate-900 border-2 border-[#97D739] rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl text-white space-y-5">
                        
                        {/* CLOSE BUTTON */}
                        <button 
                            onClick={() => setActiveModalData(null)}
                            className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-[#007A3D] text-[#97D739] rounded-2xl">
                                {React.createElement(activeModalData.icon, { size: 28 })}
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase text-[#97D739]">Service Overview</span>
                                <h3 className="text-xl font-black text-white">{activeModalData.title}</h3>
                            </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                            {activeModalData.details}
                        </p>

                        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                            <h4 className="text-xs font-black uppercase text-[#97D739]">Key Features Included:</h4>
                            {activeModalData.features.map((f, i) => (
                                <p key={i} className="text-xs text-slate-300 font-bold flex items-center gap-2">
                                    <ChevronRight size={14} className="text-[#97D739]" /> {f}
                                </p>
                            ))}
                        </div>

                        <div className="pt-2 flex gap-3">
                            <button 
                                onClick={() => setActiveModalData(null)}
                                className="w-1/2 bg-slate-800 text-slate-300 py-3 rounded-xl font-bold text-xs hover:bg-slate-700 transition"
                            >
                                Close
                            </button>
                            <button 
                                onClick={() => setActiveModalData(null)}
                                className="w-1/2 bg-[#97D739] text-[#00381b] py-3 rounded-xl font-black text-xs hover:bg-white transition"
                            >
                                Proceed Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}