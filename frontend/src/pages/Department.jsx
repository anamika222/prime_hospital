import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Stethoscope, 
    Sparkles, 
    Search, 
    Home,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.yourhospital.com/api';
const STORAGE_KEY = 'site_lang';

// Fallback initial database matching Patuakhali Prime Clinic data
const INITIAL_DEPARTMENTS = [
    {
        id: 1,
        nameEn: "Orthopedic & Trauma Surgery",
        nameBn: "অর্থোপেডিক ও ট্রমা সার্জারী",
        iconName: "Activity",
        descEn: "Advanced bone, joint, fracture treatment and modern trauma care.",
        descBn: "হাড় ভাঙা, জোড়া রোগ ও ট্রমা সার্জারীর আধুনিক চিকিৎসা সেবা।",
        totalDoctors: 2
    },
    {
        id: 2,
        nameEn: "Pediatric & Neonatology",
        nameBn: "নবজাতক, শিশু ও কিশোর রোগ",
        iconName: "Baby",
        descEn: "Specialized healthcare for newborns, infants, and adolescents.",
        descBn: "নবজাতক ও শিশুদের জটিল রোগের বিশেষায়িত চিকিৎসা সেবা।",
        totalDoctors: 2
    },
    {
        id: 3,
        nameEn: "Gastroenterology & Medicine",
        nameBn: "গ্যাস্ট্রোএন্টারোলজি ও মেডিসিন",
        iconName: "Stethoscope",
        descEn: "Digestive system, liver disorders, endoscopy, and colonoscopy.",
        descBn: "লিভার, পাকস্থলী ও পেটের যাবতীয় রোগের এন্ডোস্কপি ও চিকিৎসা।",
        totalDoctors: 1
    },
    {
        id: 4,
        nameEn: "ENT & Head-Neck Surgery",
        nameBn: "নাক, কান, গলা ও মাথা রোগ",
        iconName: "Activity",
        descEn: "Comprehensive ear, nose, throat, and head-neck surgical care.",
        descBn: "নাক, কান, গলা ও হেড-নেক সার্জারীর আধুনিক চিকিৎসা।",
        totalDoctors: 2
    },
    {
        id: 5,
        nameEn: "Obstetrics & Gynecology",
        nameBn: "প্রসূতি ও স্ত্রী রোগ বিশেষজ্ঞ",
        iconName: "Heart",
        descEn: "Complete female healthcare, pregnancy care, and gynecological surgery.",
        descBn: "গর্ভকালীন সেবা, নরমাল ও সিজারিয়ান ডেলিভারি এবং নারী স্বাস্থ্য।",
        totalDoctors: 2
    },
    {
        id: 6,
        nameEn: "Neuromedicine & Neurology",
        nameBn: "নিউরোমেডিসিন ও মেডিসিন",
        iconName: "Brain",
        descEn: "Stroke, epilepsy, headache, paralysis, and brain disorder treatment.",
        descBn: "স্ট্রোক, মাথা ব্যথা, মৃগী রোগ ও স্নায়ুতন্ত্রের বিশ্বস্ত চিকিৎসা।",
        totalDoctors: 1
    },
    {
        id: 7,
        nameEn: "Cardiology & Heart Care",
        nameBn: "হৃদরোগ ও মেডিসিন বিশেষজ্ঞ",
        iconName: "Heart",
        descEn: "Clinical ECG, Echocardiogram, and cardiovascular condition management.",
        descBn: "হৃদরোগের সর্বাধুনিক পরীক্ষা-নিরীক্ষা ও বিশেষজ্ঞ কনসালটেশন।",
        totalDoctors: 1
    }
];

export default function Department() {
    const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    // Fetch live departments from Admin Panel API
    useEffect(() => {
        const fetchDepartments = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/departments`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        const formatted = data.map(dept => ({
                            id: dept.id,
                            nameEn: dept.name_en,
                            nameBn: dept.name_bn,
                            descEn: dept.description_en || dept.description,
                            descBn: dept.description_bn || dept.description,
                            iconName: dept.icon || 'Stethoscope',
                            totalDoctors: dept.doctors ? dept.doctors.length : 0
                        }));
                        setDepartments(formatted);
                    }
                }
            } catch (err) {
                console.log("Using local department dataset (Admin API Offline)");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const filteredDepartments = departments.filter(dept => {
        const title = (dept.nameEn + dept.nameBn).toLowerCase();
        return title.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-8 selection:bg-[#97D739] selection:text-[#00381b]">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* HERO HEADER */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <span className="inline-flex items-center gap-2 bg-[#97D739]/10 border border-[#97D739]/30 text-[#97D739] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                            <Sparkles size={14} /> Medical Excellence & Care
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                        {lang === 'bn' ? 'আমাদের চিকিৎসা' : 'Our Clinical'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#97D739] to-emerald-400">{lang === 'bn' ? 'ডিপার্টমেন্টসমূহ' : 'Departments'}</span>
                    </h1>
                    
                    <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                        {lang === 'bn' 
                            ? 'পটুয়াখালী প্রাইম ক্লিনিকের সকল বিশেষায়িত বিভাগ ও অভিজ্ঞ ডাক্তারদের সেবা সম্পর্কিত তথ্য।' 
                            : 'Explore specialized medical departments and expert consultancy services.'}
                    </p>

                    {/* 🟢 Back to Home Navigation Link */}
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

                {/* SEARCH BAR */}
                <div className="max-w-md mx-auto relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text"
                        placeholder={lang === 'bn' ? 'ডিপার্টমেন্টের নাম দিয়ে খুঁজুন...' : 'Search department name...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-white rounded-2xl pl-11 pr-4 py-3 text-xs font-bold focus:outline-none focus:border-[#97D739] transition shadow-lg"
                    />
                </div>

                {/* DEPARTMENTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDepartments.map((dept, index) => (
                        <motion.div 
                            key={dept.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{ y: -6 }}
                            className="bg-slate-900/80 border border-slate-800 hover:border-[#97D739] rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group relative shadow-xl backdrop-blur-sm"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <div className="p-3.5 bg-gradient-to-br from-[#007A3D] to-slate-900 text-[#97D739] rounded-2xl border border-[#97D739]/30 shadow-md">
                                        <Stethoscope size={24} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                                        {dept.totalDoctors} {lang === 'bn' ? 'জন ডাক্তার' : 'Doctors'}
                                    </span>
                                </div>

                                <h3 className="text-lg font-black text-white group-hover:text-[#97D739] transition-colors">
                                    {lang === 'bn' ? dept.nameBn : dept.nameEn}
                                </h3>

                                <p className="text-xs text-slate-400 mt-2.5 font-medium leading-relaxed">
                                    {lang === 'bn' ? dept.descBn : dept.descEn}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                                <span className="text-[11px] font-bold text-[#97D739]">
                                    {lang === 'bn' ? 'বিশেষজ্ঞ সেবা' : 'Specialized Care'}
                                </span>
                                <Link 
                                    to="/doctors" 
                                    className="text-xs font-extrabold text-white group-hover:text-[#97D739] flex items-center gap-1 transition"
                                >
                                    <span>{lang === 'bn' ? 'ডাক্তারগণ' : 'View Doctors'}</span>
                                    <ChevronRight size={14} />
                                </Link>
                            </div>
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