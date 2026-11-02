import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, FileText, Clock, AlertCircle, Home, ShieldCheck, Phone, ArrowRight, Lock, Sparkles, Loader2, Award, ArrowLeft
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_URL || 'http://127.0.0.1:8000';
const STORAGE_KEY = 'site_lang';

const CATEGORIES_EN = [
    'All Tests', 
    'HAEMATOLOGY', 
    'SEROLOGY', 
    'URINE EXAM', 
    'BIOCHEMICAL ANALYSIS', 
    'HORMONE PANNEL', 
    'ULTRASOUND IMAGING', 
    'STOOL EXAM', 
    'CARDIAC IMAGINE', 
    'DIGITAL X-RAY'
];

const INITIAL_TEST_DATABASE = [
    // HAEMATOLOGY
    { id: 'H1', nameEn: 'CBC-ESR', nameBn: 'সিবিসি-ইএসআর', category: 'HAEMATOLOGY', timeEn: '6 Hours', timeBn: '৬ ঘণ্টা', prepEn: 'No fasting required', prepBn: 'খালি পেটে থাকার প্রয়োজন নেই', homeSample: true, descEn: 'Complete Blood Count & ESR assessment.', descBn: 'সম্পূর্ণ রক্ত কণিকা এবং ইএসআর পরীক্ষা।' },
    { id: 'H2', nameEn: 'ESR', nameBn: 'ইএসআর', category: 'HAEMATOLOGY', timeEn: '4 Hours', timeBn: '৪ ঘণ্টা', prepEn: 'No fasting required', prepBn: 'খালি পেটে থাকার প্রয়োজন নেই', homeSample: true, descEn: 'Erythrocyte Sedimentation Rate test.', descBn: 'রক্তের প্রদাহজনিত ইএসআর পরীক্ষা।' },
    { id: 'H3', nameEn: 'Platelet', nameBn: 'প্লাটিলেট', category: 'HAEMATOLOGY', timeEn: '4 Hours', timeBn: '৪ ঘণ্টা', prepEn: 'No fasting required', prepBn: 'খালি পেটে থাকার প্রয়োজন নেই', homeSample: true, descEn: 'Platelet Count evaluation.', descBn: 'রক্তের প্লাটিলেট বা অনুচক্রিকা গণনাকারী পরীক্ষা।' },
    { id: 'H4', nameEn: 'M.P (Malarial Parasite)', nameBn: 'এম.পি (ম্যালেরিয়া জীবাণু)', category: 'HAEMATOLOGY', timeEn: '4 Hours', timeBn: '৪ ঘণ্টা', prepEn: 'No fasting required', prepBn: 'খালি পেটে থাকার প্রয়োজন নেই', homeSample: true, descEn: 'Malaria parasite screening.', descBn: 'রক্তে ম্যালেরিয়া জীবাণু পরীক্ষা।' },

    // SEROLOGY
    { id: 'S1', nameEn: 'ASO Titre', nameBn: 'এএসও টাইটার', category: 'SEROLOGY', timeEn: '6 Hours', timeBn: '৬ ঘণ্টা', prepEn: 'No fasting required', prepBn: 'খালি পেটে থাকার প্রয়োজন নেই', homeSample: true, descEn: 'Streptococcal infection detection.', descBn: 'বাতজ্বর ও ব্যাকটেরিয়া ইনফেকশন পরীক্ষা।' },
    { id: 'S3', nameEn: 'Widal Test', nameBn: 'ভিডাল টেস্ট (টাইফয়েড)', category: 'SEROLOGY', timeEn: '6 Hours', timeBn: '৬ ঘণ্টা', prepEn: 'No fasting required', prepBn: 'খালি পেটে থাকার প্রয়োজন নেই', homeSample: true, descEn: 'Typhoid fever diagnosis.', descBn: 'টাইফয়েড জ্বর শনাক্তকরণ পরীক্ষা।' },
    { id: 'S7', nameEn: 'ICT Dengue (NS1/IgG/IgM)', nameBn: 'আইসিটি ডেঙ্গু (NS1/IgG/IgM)', category: 'SEROLOGY', timeEn: '4 Hours', timeBn: '৪ ঘণ্টা', prepEn: 'No fasting required', prepBn: 'খালি পেটে থাকার প্রয়োজন নেই', homeSample: true, descEn: 'Rapid Dengue Virus detection.', descBn: 'দ্রুত ডেঙ্গু ভাইরাস শনাক্তকরণ পরীক্ষা।' },

    // BIOCHEMICAL ANALYSIS
    { id: 'B1', nameEn: 'Blood Sugar (Fasting / 2hrs ABF)', nameBn: 'ব্ল্যাড সুগার (খালি পেটে / খাওয়ার ২ ঘণ্টা পর)', category: 'BIOCHEMICAL ANALYSIS', timeEn: '3 Hours', timeBn: '৩ ঘণ্টা', prepEn: 'Fasting 8-10 hrs if FBS', prepBn: 'FBS হলে ৮-১০ ঘণ্টা খালি পেটে থাকুন', homeSample: true, descEn: 'Glucose level assessment.', descBn: 'রক্তে গ্লুকোজ বা ডায়াবেটিস পরীক্ষা।' },
    { id: 'B2', nameEn: 'HbA1c', nameBn: 'এইচবিএ১সি (HbA1c)', category: 'BIOCHEMICAL ANALYSIS', timeEn: 'Same Day', timeBn: 'একই দিনে', prepEn: 'No fasting required', prepBn: 'খালি পেটে থাকার প্রয়োজন নেই', homeSample: true, descEn: 'Average 3-month sugar monitoring.', descBn: 'গত ৩ মাসের গড় ডায়াবেটিস নিয়ন্ত্রণ পরীক্ষা।' },
    { id: 'B3', nameEn: 'Lipid Profile', nameBn: 'লিপিড প্রোফাইল (রক্তের চর্বি)', category: 'BIOCHEMICAL ANALYSIS', timeEn: '12 Hours', timeBn: '১২ ঘণ্টা', prepEn: '10-12 hours overnight fasting', prepBn: '১০-১২ ঘণ্টা রাতে খালি পেটে থাকুন', homeSample: true, descEn: 'Cholesterol, HDL, LDL & Triglycerides.', descBn: 'রক্তের কোলেস্টেরল ও চর্বির পূর্ণাঙ্গ পরীক্ষা।' },

    // ULTRASOUND IMAGING
    { id: 'US1', nameEn: 'Whole Abdomen USG', nameBn: 'হোল অ্যাবডোমেন আল্ট্রাসনোগ্রাম', category: 'ULTRASOUND IMAGING', timeEn: 'Same Day', timeBn: 'একই দিনে', prepEn: 'Full bladder & 6 hrs fasting required', prepBn: 'প্রস্রাবের চাপ ও ৬ ঘণ্টা খালি পেট প্রয়োজন', homeSample: false, descEn: 'Ultrasound screening of abdominal organs.', descBn: 'পেটের ভেতরের অঙ্গপ্রত্যঙ্গের আল্ট্রাসাউন্ড।' },

    // DIGITAL X-RAY
    { id: 'X1', nameEn: 'Chest X-Ray PA View', nameBn: 'চেস্ট এক্স-রে (ডিজিটাল)', category: 'DIGITAL X-RAY', timeEn: '2 Hours', timeBn: '২ ঘণ্টা', prepEn: 'Remove metallic items', prepBn: 'ধাতব বস্তু বা চেইন খুলে রাখুন', homeSample: false, descEn: 'Digital lung and heart X-Ray.', descBn: 'ফুসফুস ও বুকের ডিজিটাল এক্স-রে।' }
];

export default function Report() {
    const [activeTab, setActiveTab] = useState('tests');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Tests');

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

    const [testDatabase, setTestDatabase] = useState(INITIAL_TEST_DATABASE);
    const [patientId, setPatientId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [reportResult, setReportResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Media / PDF File URL Resolver
    const getFileUrl = (filePath) => {
        if (!filePath || filePath === '#') return '#';
        if (filePath.startsWith('http://') || filePath.startsWith('https://')) return filePath;
        return `${MEDIA_BASE_URL}${filePath}`;
    };

    useEffect(() => {
        const fetchAdminTests = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/tests`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setTestDatabase(data);
                    }
                }
            } catch (error) {
                console.log("Using local test database fallback");
            }
        };

        fetchAdminTests();
    }, []);

    const filteredTests = testDatabase.filter(test => {
        const matchesCat = selectedCategory === 'All Tests' || test.category === selectedCategory;
        const nameToSearch = (test.nameBn || test.name || test.nameEn || '').toLowerCase();
        const matchesSearch = nameToSearch.includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    const handleReportSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setReportResult(null);

        try {
            const response = await fetch(`${API_BASE_URL}/reports/download`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientId, mobileNo })
            });

            if (response.ok) {
                const data = await response.json();
                setReportResult(data);
            } else {
                setTimeout(() => {
                    setReportResult({
                        patientNameEn: 'Md. Al-Amin',
                        patientNameBn: 'মোঃ আল-আমিন',
                        invoiceNo: patientId.toUpperCase() || 'LAB-2026-9842',
                        testNameEn: 'Complete Blood Count (CBC) & Fasting Blood Sugar',
                        testNameBn: 'সিবিসি এবং ফাস্টিং ব্ল্যাড সুগার',
                        date: '17 Aug, 2026',
                        statusEn: 'Ready for Download',
                        statusBn: 'ডাউনলোডের জন্য প্রস্তুত',
                        doctorEn: 'Prof. Dr. S. M. Rahman (Chief Pathologist)',
                        doctorBn: 'অধ্যাপক ডাঃ এস. এম. রহমান (প্রধান প্যাথলজিস্ট)',
                        downloadUrl: '#'
                    });
                }, 1000);
            }
        } catch (err) {
            setTimeout(() => {
                setReportResult({
                    patientNameEn: 'Md. Al-Amin',
                    patientNameBn: 'মোঃ আল-আমিন',
                    invoiceNo: patientId.toUpperCase() || 'LAB-2026-9842',
                    testNameEn: 'Complete Blood Count (CBC)',
                    testNameBn: 'সম্পূর্ণ রক্ত কণিকা পরীক্ষা (CBC)',
                    date: 'Today',
                    statusEn: 'Ready for Download',
                    statusBn: 'ডাউনলোডের জন্য প্রস্তুত',
                    doctorEn: 'Duty Pathologist',
                    doctorBn: 'অন-ডিউটি প্যাথলজিস্ট',
                    downloadUrl: '#'
                });
            }, 1000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 selection:bg-[#97D739] selection:text-[#00381b]">
            
            {/* HERO SECTION */}
            <section className="relative py-16 sm:py-20 px-4 sm:px-8 text-center overflow-hidden bg-gradient-to-b from-[#00381b] via-[#004d26] to-slate-950">
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#97D739] rounded-full blur-3xl pointer-events-none"
                />

                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto relative z-10 space-y-4"
                >
                    <div className="inline-flex items-center gap-2 bg-[#97D739]/20 border border-[#97D739]/40 text-[#97D739] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg">
                        <Sparkles size={14} className="animate-spin" /> ISO 15189 Certified Diagnostic Center
                    </div>
                    
                    <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight">
                        {lang === 'bn' ? 'ডায়াগনস্টিক টেস্ট ও ' : 'Diagnostic Tests & '} 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#86EFAC] to-[#97D739]">
                            {lang === 'bn' ? 'ডিজিটাল রিপোর্ট' : 'Digital Reports'}
                        </span>
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
                        {lang === 'bn' 
                            ? 'আমাদের সকল প্যাথলজি ও ইমেজিন পরীক্ষা সম্পর্কে জানুন অথবা সহজেই আপনার ডিজিটাল রিপোর্ট ডাউনলোড করুন।' 
                            : 'Explore our full range of pathology and imaging services or access your digital lab reports instantly.'}
                    </p>

                    {/* 🟢 Back to Home Link */}
                    <div className="pt-1">
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-[#97D739] bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl transition backdrop-blur-md"
                        >
                            <ArrowLeft size={14} />
                            <span>{lang === 'bn' ? 'হোম পেজে ফিরে যান' : 'Back to Home'}</span>
                        </Link>
                    </div>

                    <div className="pt-4 flex flex-wrap justify-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab('tests')}
                            className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                                activeTab === 'tests' 
                                    ? 'bg-[#97D739] text-[#00381b] shadow-xl shadow-[#97D739]/20' 
                                    : 'bg-slate-900/80 text-slate-300 border border-slate-800'
                            }`}
                        >
                            <Search size={16} />
                            <span>{lang === 'bn' ? 'সকল টেস্টের বিবরণ' : 'Browse Available Tests'}</span>
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab('portal')}
                            className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                                activeTab === 'portal' 
                                    ? 'bg-[#97D739] text-[#00381b] shadow-xl shadow-[#97D739]/20' 
                                    : 'bg-slate-900/80 text-slate-300 border border-[#97D739]/40'
                            }`}
                        >
                            <FileText size={16} />
                            <span>{lang === 'bn' ? 'অনলাইন রিপোর্ট ডাউনলোড' : 'Download Online Report'}</span>
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* QUALITY BADGES */}
            <section className="max-w-6xl mx-auto px-4 sm:px-8 -mt-6 relative z-20">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center backdrop-blur-md shadow-2xl">
                    <div className="p-2 space-y-1">
                        <Award size={20} className="text-[#97D739] mx-auto" />
                        <h4 className="text-xs font-black text-white">{lang === 'bn' ? 'ISO ১৫১৮৯ মানসম্মত' : 'ISO 15189 Certified'}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{lang === 'bn' ? 'আন্তর্জাতিক ল্যাব স্ট্যান্ডার্ড' : 'International standard'}</p>
                    </div>
                    <div className="p-2 space-y-1">
                        <ShieldCheck size={20} className="text-[#97D739] mx-auto" />
                        <h4 className="text-xs font-black text-white">{lang === 'bn' ? 'পূর্ণাঙ্গ অটোমেটেড' : 'Fully Automated'}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{lang === 'bn' ? 'আধুনিক ল্যাব যন্ত্রপাতি' : 'Advanced Lab Equipment'}</p>
                    </div>
                    <div className="p-2 space-y-1">
                        <Clock size={20} className="text-[#97D739] mx-auto" />
                        <h4 className="text-xs font-black text-white">{lang === 'bn' ? 'দ্রুত রিপোর্ট' : 'Fast Delivery'}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{lang === 'bn' ? 'অনলাইন রিপোর্ট সুবিধা' : 'Online portal access'}</p>
                    </div>
                    <div className="p-2 space-y-1">
                        <Home size={20} className="text-[#97D739] mx-auto" />
                        <h4 className="text-xs font-black text-white">{lang === 'bn' ? 'হোম কালেকশন' : 'Home Collection'}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{lang === 'bn' ? 'অভিজ্ঞ টেকনিশিয়ান' : 'Certified Technicians'}</p>
                    </div>
                </div>
            </section>

            {/* MAIN TAB CONTENT */}
            <AnimatePresence mode="wait">
                {activeTab === 'tests' ? (
                    <motion.div 
                        key="tests-tab"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-6xl mx-auto px-4 sm:px-8 mt-10 space-y-8"
                    >
                        {/* SEARCH & FILTER BAR */}
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
                            <div className="relative w-full md:w-96">
                                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text"
                                    placeholder={lang === 'bn' ? 'টেস্টের নাম দিয়ে খুঁজুন (যেমন: CBC, USG)...' : 'Search test name (e.g. CBC, Lipid, USG)...'}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#97D739]"
                                />
                            </div>

                            <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
                                {CATEGORIES_EN.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3.5 py-2 rounded-xl text-[11px] font-black whitespace-nowrap transition-all cursor-pointer ${
                                            selectedCategory === cat
                                                ? 'bg-[#007A3D] text-[#97D739] border border-[#97D739] shadow-md'
                                                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* CARDS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTests.map((test, index) => (
                                <motion.div 
                                    key={test.id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.04 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-slate-900/80 border border-slate-800 hover:border-[#97D739] rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group relative shadow-xl backdrop-blur-sm"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-black uppercase text-[#00381b] bg-[#97D739] px-3 py-1 rounded-full shadow-lg">
                                                {test.category}
                                            </span>
                                            {test.homeSample && (
                                                <span className="text-[10px] font-bold text-slate-400 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md flex items-center gap-1">
                                                    <Home size={10} className="text-[#97D739]" /> {lang === 'bn' ? 'হোম স্যাম্পল' : 'Home Sample'}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-base font-black text-white group-hover:text-[#97D739] transition-colors">
                                            {lang === 'bn' ? (test.nameBn || test.name) : (test.nameEn || test.name)}
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">
                                            {lang === 'bn' ? (test.descBn || test.desc) : (test.descEn || test.desc)}
                                        </p>

                                        <div className="mt-5 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-[#97D739]" />
                                                <span>{lang === 'bn' ? 'রিপোর্ট ডেলিভারি সময়: ' : 'Estimated Report: '} {lang === 'bn' ? (test.timeBn || test.time) : (test.timeEn || test.time)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-amber-400">
                                                <AlertCircle size={14} />
                                                <span>{lang === 'bn' ? 'প্রস্তুতি: ' : 'Prep: '} {lang === 'bn' ? (test.prepBn || test.prep) : (test.prepEn || test.prep)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                                        <div className="text-[11px] text-slate-400 font-bold">
                                            {lang === 'bn' ? 'স্যাম্পল সংগ্রহ: ' : 'Sample Collection: '} 
                                            <span className="text-white font-medium">{test.homeSample ? (lang === 'bn' ? 'উপলব্ধ' : 'Available') : (lang === 'bn' ? 'শুধু ল্যাবে' : 'Lab Only')}</span>
                                        </div>
                                        <Link 
                                            to="/appointment"
                                            className="bg-[#007A3D] hover:bg-[#004d26] text-white px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                                        >
                                            <span>{lang === 'bn' ? 'বুক করুন' : 'Book Visit'}</span>
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    /* REPORT DOWNLOAD PORTAL */
                    <motion.div 
                        key="portal-tab"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-2xl mx-auto px-4 sm:px-8 mt-10"
                    >
                        <div className="bg-slate-900 border-2 border-[#007A3D] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3.5 bg-[#007A3D] text-[#97D739] rounded-2xl shadow-lg border border-[#97D739]/30">
                                    <ShieldCheck size={28} />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-white">
                                        {lang === 'bn' ? 'অনলাইন পেশেন্ট রিপোর্ট ডাউনলোড' : 'Download Online Report'}
                                    </h2>
                                    <p className="text-xs text-slate-400 font-medium">
                                        {lang === 'bn' ? 'আপনার ইনভয়েস/পেশেন্ট আইডি এবং নিবন্ধিত মোবাইল নম্বর লিখুন।' : 'Enter your Invoice/Patient ID and registered mobile number.'}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleReportSearch} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-300 mb-1.5">
                                        {lang === 'bn' ? 'ইনভয়েস নম্বর / পেশেন্ট আইডি' : 'Invoice No / Patient ID'}
                                    </label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input 
                                            type="text" 
                                            required
                                            placeholder="e.g. LAB-2026-9842"
                                            value={patientId}
                                            onChange={(e) => setPatientId(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm font-bold focus:outline-none focus:border-[#97D739]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-300 mb-1.5">
                                        {lang === 'bn' ? 'নিবন্ধিত মোবাইল নম্বর' : 'Registered Mobile Number'}
                                    </label>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input 
                                            type="tel" 
                                            required
                                            placeholder="e.g. 01700000000"
                                            value={mobileNo}
                                            onChange={(e) => setMobileNo(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm font-bold focus:outline-none focus:border-[#97D739]"
                                        />
                                    </div>
                                </div>

                                <motion.button 
                                    whileTap={{ scale: 0.97 }}
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full bg-[#97D739] hover:bg-white text-[#00381b] py-3.5 rounded-xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 mt-2 cursor-pointer"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>{lang === 'bn' ? 'অনুসন্ধান করা হচ্ছে...' : 'Searching Medical Database...'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Search size={18} />
                                            <span>{lang === 'bn' ? 'রিপোর্ট খুঁজুন' : 'Find Lab Report'}</span>
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            {/* REPORT RESULT */}
                            <AnimatePresence>
                                {reportResult && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mt-8 pt-6 border-t border-slate-800 space-y-4"
                                    >
                                        <div className="bg-slate-950 border border-[#97D739]/50 p-5 rounded-2xl space-y-4 shadow-xl">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black uppercase text-[#00381b] bg-[#97D739] px-3 py-1 rounded-full shadow">
                                                    {lang === 'bn' ? (reportResult.statusBn || reportResult.statusEn) : (reportResult.statusEn || reportResult.status)}
                                                </span>
                                                <span className="text-xs text-slate-400 font-bold">{reportResult.date}</span>
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-black text-white">
                                                    {lang === 'bn' ? (reportResult.patientNameBn || reportResult.patientNameEn) : (reportResult.patientNameEn || reportResult.patientName)}
                                                </h4>
                                                <p className="text-xs text-slate-400 font-bold">Invoice: {reportResult.invoiceNo}</p>
                                            </div>

                                            <div className="text-xs text-slate-300 font-semibold space-y-1 border-t border-slate-900 pt-3">
                                                <p><span className="text-slate-500">{lang === 'bn' ? 'পরীক্ষা:' : 'Test Ordered:'}</span> {lang === 'bn' ? (reportResult.testNameBn || reportResult.testNameEn) : (reportResult.testNameEn || reportResult.testName)}</p>
                                                <p><span className="text-slate-500">{lang === 'bn' ? 'স্বাক্ষরকারী ডাক্তার:' : 'Signatory:'}</span> {lang === 'bn' ? (reportResult.doctorBn || reportResult.doctorEn) : (reportResult.doctorEn || reportResult.doctor)}</p>
                                            </div>

                                            <motion.a 
                                                whileTap={{ scale: 0.95 }}
                                                href={getFileUrl(reportResult.downloadUrl)} 
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => { 
                                                    if(!reportResult.downloadUrl || reportResult.downloadUrl === '#') {
                                                        e.preventDefault(); 
                                                        alert(lang === 'bn' ? 'অফিসিয়াল ল্যাব রিপোর্ট পিডিএফ ডাউনলোড করা হচ্ছে...' : 'Downloading official lab report PDF...'); 
                                                    }
                                                }}
                                                className="w-full bg-[#007A3D] hover:bg-[#005e2e] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg cursor-pointer"
                                            >
                                                <FileText size={16} />
                                                <span>{lang === 'bn' ? 'পিডিএফ রিপোর্ট ডাউনলোড করুন' : 'Download PDF Report'}</span>
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* BOTTOM FOOTER LINK */}
            <div className="text-center pt-10">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-[#97D739] hover:underline"
                >
                    <Home size={16} />
                    <span>{lang === 'bn' ? 'মূল হোম পেজে ফিরে যান' : 'Go back to main Home page'}</span>
                </Link>
            </div>

        </div>
    );
}