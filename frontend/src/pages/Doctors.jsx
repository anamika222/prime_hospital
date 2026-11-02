import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, Phone, Award, Sparkles, Home, ArrowLeft } from 'lucide-react';

// Vite-safe Environment Variable Access
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_URL || 'http://127.0.0.1:8000';
const STORAGE_KEY = 'site_lang';

// Excel sheet matching initial doctor database
const INITIAL_DOCTORS = [
    {
        id: 1,
        name_en: "Dr. Md. Monir Hossain",
        name_bn: "ডাঃ মোঃ মনির হোসেন",
        dept_en: "Orthopedic Consultant and Trauma Surgeon",
        dept_bn: "অর্থোপেডিক কনসালটেন্ট ও ট্রমা সার্জন",
        degrees_en: "M.B.B.S (Dhaka), B.C.S (Health), M.S (Orthopedic Surgery) (NITOR), Associate Fellow (American College of Surgeons)",
        degrees_bn: "এম.বি.বি.এস (ঢাকা), বি.সি.এস (স্বাস্থ্য), এম.এস (অর্থোপেডিক সার্জারী) (নিটোর), অ্যাসোসিয়েট ফেলো আমেরিকান কলেজ অফ সার্জন",
        time_en: "Every Day: 4:00 PM – 9:00 PM",
        time_bn: "প্রতিদিন বিকাল ৪টা থেকে রাত ৯টা পর্যন্ত।",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        name_en: "Professor Dr. Md. Mostafizur Rahman",
        name_bn: "অধ্যাপক ডাঃ মোঃ মোস্তাফিজুর রহমান",
        dept_en: "Neonatal, Pediatric and Adolescent Diseases",
        dept_bn: "নবজাতক, শিশু ও কিশোর রোগ বিশেষজ্ঞ",
        degrees_en: "M.B.B.S, D.C.H., M.C.P.S (Pediatrics), F.C.P.S (Pediatrics), Former Professor (Patuakhali Medical College Hospital)",
        degrees_bn: "এমবিবিএস, ডিসিএইচ, এমসিপিএস (শিশু), এফসিপিএস (শিশু), সাবেক অধ্যাপক (পটুয়াখালী মেডিকেল কলেজ)",
        time_en: "Friday: 10:00 AM – 10:00 PM | Mon & Wed: 4:00 PM – 10:00 PM",
        time_bn: "শুক্রবার সকাল ১০ টা - রাত ১০ টা | সোম ও বুধবার বিকাল ৪টা রাত ১০টা",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        name_en: "Dr. Ratan Krishna Saha",
        name_bn: "ডাঃ রতন কৃষ্ণ সাহা",
        dept_en: "Neonatal, Pediatric and Adolescent Diseases",
        dept_bn: "নবজাতক, শিশু ও কিশোর রোগ বিশেষজ্ঞ",
        degrees_en: "M.B.B.S, B.C.S (Health), M.D (Pediatrics), Trained in Pediatric Endoscopy (Apollo Hospital, Delhi)",
        degrees_bn: "এমবিবিএস, বিসিএস (স্বাস্থ্য), এমডি (শিশু), শিশু এন্ডোস্কপি ও কলোনস্কোপিতে প্রশিক্ষণপ্রাপ্ত (অ্যাপোলো হসপিটাল, দিল্লী)",
        time_en: "Every Thursday: 4:00 PM – 10:00 PM",
        time_bn: "প্রতি বৃহস্পতিবার বিকাল ৪টা - রাত ১০টা পর্যন্ত।",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 4,
        name_en: "Dr. Md. Rafiqul Islam",
        name_bn: "ডাঃ মোঃ রফিকুল ইসলাম",
        dept_en: "Gastroenterology and Medicine",
        dept_bn: "গ্যাস্ট্রোএন্টারোলজি ও মেডিসিন বিশেষজ্ঞ",
        degrees_en: "M.B.B.S, B.C.S (Health), M.D (Gastroenterology), Associate Professor & Head of Dept (Patuakhali Medical College)",
        degrees_bn: "এমবিবিএস, বিসিএস (স্বাস্থ্য), এমডি (গ্যাস্ট্রোএন্টারোলজি), সহযোগী অধ্যাপক ও বিভাগীয় প্রধান (পটুয়াখালী মেডিকেল কলেজ)",
        time_en: "Every Day: 4:00 PM – 9:00 PM | Fri: 9 AM-1 PM, 4-9 PM (Tue Closed)",
        time_bn: "প্রতিদিন বিকাল ৪টা-৯টা | শুক্রবার সকাল ৯-১টা, বিকাল ৪-৯টা (মঙ্গলবার বন্ধ)",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 5,
        name_en: "Dr. Khan Abdur Rauf",
        name_bn: "ডাঃ খান আবদুর রউফ",
        dept_en: "Ear, Nose, Throat (ENT) and Head Disorders",
        dept_bn: "নাক, কান, গলা ও মাথা রোগ বিশেষজ্ঞ এবং সার্জন",
        degrees_en: "M.B.B.S, D.L.O (D.U), Associate Professor (Gonoshasthaya Medical College)",
        degrees_bn: "এমবিবিএস, ডিএলও (ডি.ইউ), সহযোগী অধ্যাপক (গণস্বাস্থ্য মেডিকেল কলেজ), সাবেক সহকারী অধ্যাপক (শেবাচিম)",
        time_en: "Every Saturday: 10:00 AM – 5:00 PM",
        time_bn: "প্রতি শনিবার সকাল ১০ টা - বিকাল ৫ টা",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 6,
        name_en: "Dr. Md. Mashiur Rahman (Khokon)",
        name_bn: "ডাঃ মোঃ মশিউর রহমান (খোকন)",
        dept_en: "Neuromedicine and Medicine",
        dept_bn: "নিউরোমেডিসিন ও মেডিসিন রোগ বিশেষজ্ঞ",
        degrees_en: "M.B.B.S (Dhaka), B.C.S (Health), M.D (Neurology), Fellow in EEG (NINS), Member (American Academy of Neurology)",
        degrees_bn: "এমবিবিএস (ঢাকা), বিসিএস (স্বাস্থ্য), এমডি (নিউরোলজি), ফেলোশীপ (নিন্স), সদস্য (আমেরিকান একাডেমী অব নিউরোলজি)",
        time_en: "Sat, Sun, Mon, Tue & Wed: 4:00 PM – 10:00 PM",
        time_bn: "প্রতি শনি, রবি, সোম, মঙ্গল ও বুধবার (বিকাল ৪টা - রাত ১০টা)",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 7,
        name_en: "Dr. Himel Pal",
        name_bn: "ডাঃ হিমেল পাল",
        dept_en: "Cardiology and Medicine",
        dept_bn: "হৃদরোগ ও মেডিসিন বিশেষজ্ঞ",
        degrees_en: "M.B.B.S, B.C.S (Health), M.D (Cardiology) NICVD, Clinical & Interventional Cardiologist",
        degrees_bn: "এম.বি.বি.এস., বি.সি.এস. (স্বাস্থ্য), এমডি (কার্ডিওলজি) এনআইসিভিডি, ক্লিনিক্যাল ও ইন্টারভেনশনাল কার্ডিওলজিস্ট",
        time_en: "Every Tuesday: 4:00 PM – 9:00 PM",
        time_bn: "প্রতি মঙ্গলবার বিকেল ৪টা থেকে রাত ৯টা পর্যন্ত।",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
    }
];

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');

    // 🟢 1. Initialize language from LocalStorage
    const [lang, setLang] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'bn';
        } catch {
            return 'bn';
        }
    });

    // 🟢 2. Sync with Navbar's languageChange event
    useEffect(() => {
        const handleLangChange = () => {
            const currentLang = localStorage.getItem(STORAGE_KEY) || 'bn';
            setLang(currentLang);
        };

        window.addEventListener('languageChange', handleLangChange);
        return () => window.removeEventListener('languageChange', handleLangChange);
    }, []);

    // Admin Panel dynamic media URL formatter
    const getImageUrl = (imgPath) => {
        if (!imgPath) return "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400";
        if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) return imgPath;
        return `${MEDIA_BASE_URL}${imgPath}`;
    };

    // Admin Panel API integration
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/doctors`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        const formatted = data.map(doc => ({
                            id: doc.id,
                            name_en: doc.name_en,
                            name_bn: doc.name_bn,
                            dept_en: doc.departmentName || doc.dept_en,
                            dept_bn: doc.dept_bn || doc.departmentName,
                            degrees_en: doc.degrees_en,
                            degrees_bn: doc.degrees_bn,
                            time_en: doc.chamber_time_en || doc.time_en,
                            time_bn: doc.chamber_time_bn || doc.time_bn,
                            image: doc.image
                        }));
                        setDoctors(formatted);
                    }
                }
            } catch (err) {
                console.log("Using local excel doctor data");
            }
        };
        fetchDoctors();
    }, []);

    const departments = ['All', ...new Set(doctors.map(d => lang === 'bn' ? (d.dept_bn || d.dept_en) : (d.dept_en || d.dept_bn)))];

    const filteredDoctors = doctors.filter(doc => {
        const nameMatch = (doc.name_bn + doc.name_en).toLowerCase().includes(searchQuery.toLowerCase());
        const currentDept = lang === 'bn' ? (doc.dept_bn || doc.dept_en) : (doc.dept_en || doc.dept_bn);
        const deptMatch = selectedDept === 'All' || currentDept === selectedDept;
        return nameMatch && deptMatch;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* HEADER */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-[#97D739]/10 border border-[#97D739]/30 text-[#97D739] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                        <Sparkles size={14} /> Prime Clinic Doctor Directory
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black text-white">
                        {lang === 'bn' ? 'আমাদের বিশেষজ্ঞ' : 'Our Specialist'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#97D739] to-emerald-400">{lang === 'bn' ? 'ডাক্তারবৃন্দ' : 'Doctors'}</span>
                    </h1>

                    <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                        {lang === 'bn' ? 'পটুয়াখালী প্রাইম ক্লিনিকের শীর্ষমানের বিশেষজ্ঞ চিকিৎসকদের সময়সূচী দেখুন ও সিরিয়াল দিন।' : 'Check schedules and book appointments with top medical specialists.'}
                    </p>

                    {/* 🟢 Back to Home Link */}
                    <div className="pt-1">
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#97D739] bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl transition"
                        >
                            <ArrowLeft size={14} />
                            <span>{lang === 'bn' ? 'হোম পেজে ফিরে যান' : 'Back to Home'}</span>
                        </Link>
                    </div>
                </div>

                {/* SEARCH & FILTER */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
                    <div className="relative w-full md:w-96">
                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text"
                            placeholder={lang === 'bn' ? 'ডাক্তারের নাম দিয়ে খুঁজুন...' : 'Search by doctor name...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#97D739]"
                        />
                    </div>

                    {/* Department Badges */}
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
                        {departments.map(dept => (
                            <button
                                key={dept}
                                onClick={() => setSelectedDept(dept)}
                                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                                    selectedDept === dept
                                        ? 'bg-[#007A3D] text-[#97D739] border border-[#97D739]'
                                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                                }`}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                </div>

                {/* DOCTORS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map(doc => (
                        <motion.div 
                            key={doc.id}
                            whileHover={{ y: -5 }}
                            className="bg-slate-900/90 border border-slate-800 hover:border-[#97D739] rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl relative group"
                        >
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <img 
                                        src={getImageUrl(doc.image)} 
                                        alt={doc.name_en}
                                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[#007A3D] shadow-md"
                                    />
                                    <div>
                                        <span className="text-[10px] font-black uppercase text-[#00381b] bg-[#97D739] px-2.5 py-0.5 rounded-full inline-block mb-1">
                                            {lang === 'bn' ? (doc.dept_bn || doc.dept_en) : (doc.dept_en || doc.dept_bn)}
                                        </span>
                                        <h3 className="text-base font-extrabold text-white group-hover:text-[#97D739] transition">
                                            {lang === 'bn' ? doc.name_bn : doc.name_en}
                                        </h3>
                                    </div>
                                </div>

                                <div className="space-y-3 text-xs text-slate-300">
                                    <div className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                                        <Award size={16} className="text-[#97D739] shrink-0 mt-0.5" />
                                        <p className="leading-relaxed font-medium">
                                            {lang === 'bn' ? doc.degrees_bn : doc.degrees_en}
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-amber-400">
                                        <Clock size={16} className="shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Chamber Time</span>
                                            <p className="font-semibold">{lang === 'bn' ? doc.time_bn : doc.time_en}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link 
                                to="/appointment"
                                className="w-full mt-5 bg-[#007A3D] hover:bg-[#005e2e] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg cursor-pointer"
                            >
                                <Phone size={14} />
                                <span>{lang === 'bn' ? 'সিরিয়াল বুক করুন' : 'Book Appointment'}</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* BOTTOM FOOTER LINK */}
                <div className="text-center pt-6">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-xs font-extrabold text-[#97D739] hover:underline"
                    >
                        <Home size={16} />
                        <span>{lang === 'bn' ? 'মূল হোম পেজে ফিরে যান' : 'Go back to main Home page'}</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}