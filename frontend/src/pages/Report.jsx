import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    FileText, 
    Download, 
    Clock, 
    AlertCircle, 
    Home, 
    ShieldCheck, 
    Phone, 
    ArrowRight,
    Lock,
    Sparkles,
    Loader2,
    CheckCircle2,
    X,
    Stethoscope,
    Award,
    ChevronDown,
    ChevronUp,
    Utensils,
    Droplet,
    SlidersHorizontal,
    UserCheck
} from 'lucide-react';

const CATEGORIES = ['All Tests', 'Blood Test', 'Diabetes', 'Radiology', 'Cardiology', 'Packages'];

const TEST_DATABASE = [
    {
        id: 'T101',
        name: 'Complete Blood Count (CBC)',
        category: 'Blood Test',
        price: '৳ ৪৫০',
        numericPrice: 450,
        time: '6 Hours',
        prep: 'No fasting required',
        homeSample: true,
        desc: 'Evaluates overall health and checks for anemia, infection, and blood disorders.',
        dos: ['Drink normal water', 'Rest before blood draw'],
        donts: ['Avoid heavy exercise 1 hour before test', 'Don\'t take unprescribed medicine'],
        waterRule: 'Normal drinking allowed',
        image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'T102',
        name: 'Fasting Blood Sugar (FBS)',
        category: 'Diabetes',
        price: '৳ ২০০',
        numericPrice: 200,
        time: '4 Hours',
        prep: '8-12 hours fasting required',
        homeSample: true,
        desc: 'Measures blood glucose levels after fasting to diagnose or monitor diabetes.',
        dos: ['Fast for minimum 8-10 hours overnight', 'Sip plain water if needed'],
        donts: ['No morning tea, coffee or breakfast', 'No smoking before test'],
        waterRule: 'Only plain water in small amounts',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'T103',
        name: 'HbA1c (Glycated Hemoglobin)',
        category: 'Diabetes',
        price: '৳ ৮৫০',
        numericPrice: 850,
        time: 'Same Day',
        prep: 'No fasting required',
        homeSample: true,
        desc: 'Shows average blood sugar control over the past 2 to 3 months.',
        dos: ['Eat normal diet prior to test', 'Stay hydrated'],
        donts: ['No strict restriction required'],
        waterRule: 'Normal water allowed',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'T104',
        name: 'Digital Chest X-Ray (PA View)',
        category: 'Radiology',
        price: '৳ ৮০০',
        numericPrice: 800,
        time: '2 Hours',
        prep: 'Remove chest jewelry',
        homeSample: false,
        desc: 'High-precision digital imaging for lungs, heart, and chest wall screening.',
        dos: ['Wear comfortable cotton clothes', 'Inform if you are pregnant'],
        donts: ['Remove metal items, chains or pins before entering X-Ray room'],
        waterRule: 'No restriction',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'T105',
        name: 'Lipid Profile (Full Panel)',
        category: 'Cardiology',
        price: '৳ ১,২০০',
        numericPrice: 1200,
        time: '12 Hours',
        prep: '10-12 hours fasting required',
        homeSample: true,
        desc: 'Measures HDL, LDL, and cholesterol levels for heart health assessment.',
        dos: ['12 hours strict overnight fasting required', 'Light dinner previous night'],
        donts: ['Avoid fatty food or alcohol 24 hours prior'],
        waterRule: 'Only plain water',
        image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'T106',
        name: 'Executive Full Body Screening',
        category: 'Packages',
        price: '৳ ৫,৫০০',
        numericPrice: 5500,
        time: '24 Hours',
        prep: '10 hours fasting required',
        homeSample: true,
        desc: 'Comprehensive 40+ tests: Kidney, Liver, Heart, Blood & Diabetic profiles.',
        dos: ['10-12 hours fasting required', 'Bring previous medical history if available'],
        donts: ['Do not consume alcohol or heavy meal night before'],
        waterRule: 'Plain water allowed in morning',
        image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=600'
    }
];

const PATHOLOGISTS = [
    {
        name: 'Prof. Dr. S. M. Rahman',
        title: 'Chief Pathologist & Lab Director',
        degrees: 'MBBS, FCPS (Pathology), FICP (USA)',
        exp: '22+ Years Experience'
    },
    {
        name: 'Dr. Nusrat Jahan',
        title: 'Senior Microbiologist',
        degrees: 'MBBS, MD (Microbiology)',
        exp: '14+ Years Experience'
    }
];

const FAQS = [
    {
        q: 'How long does it take to get my online report?',
        a: 'Routine blood tests (like CBC or FBS) are delivered within 4 to 6 hours. Special profiles or cultures may take up to 24-48 hours.'
    },
    {
        q: 'Is home sample collection completely safe and hygienic?',
        a: 'Yes! Our certified lab technicians use vacuum blood tubes (BD Vacutainer) and follow strict WHO sterilization protocols during home visits.'
    },
    {
        q: 'How can I pay for my booked lab tests?',
        a: 'You can pay online via bKash, Nagad, Visa/Mastercard, or opt for Cash on Collection during home sample visits.'
    }
];

export default function Report() {
    const [activeTab, setActiveTab] = useState('tests');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Tests');

    // Portal States
    const [patientId, setPatientId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [reportResult, setReportResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Health Quiz States
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [quizAge, setQuizAge] = useState('');
    const [quizGender, setQuizGender] = useState('Male');
    const [quizSymptoms, setQuizSymptoms] = useState([]);
    const [quizResultTests, setQuizResultTests] = useState([]);

    // Preparation Guide State
    const [selectedPrepTest, setSelectedPrepTest] = useState(null);

    // Compare Tests States
    const [compareList, setCompareList] = useState([]);
    const [isCompareOpen, setIsCompareOpen] = useState(false);

    // FAQ State
    const [openFaq, setOpenFaq] = useState(null);

    const filteredTests = TEST_DATABASE.filter(test => {
        const matchesCat = selectedCategory === 'All Tests' || test.category === selectedCategory;
        const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    const handleReportSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setReportResult(null);

        setTimeout(() => {
            setLoading(false);
            setReportResult({
                patientName: 'Md. Al-Amin',
                invoiceNo: patientId.toUpperCase() || 'LAB-2026-9842',
                testName: 'Complete Blood Count (CBC) & Fasting Blood Sugar',
                date: '17 Aug, 2026',
                status: 'Ready for Download',
                doctor: 'Prof. Dr. S. M. Rahman (Chief Pathologist)'
            });
        }, 1200);
    };

    const toggleCompare = (test) => {
        if (compareList.some(item => item.id === test.id)) {
            setCompareList(compareList.filter(item => item.id !== test.id));
        } else {
            if (compareList.length >= 3) {
                alert('You can compare up to 3 tests at a time.');
                return;
            }
            setCompareList([...compareList, test]);
        }
    };

    const toggleSymptom = (symptom) => {
        if (quizSymptoms.includes(symptom)) {
            setQuizSymptoms(quizSymptoms.filter(s => s !== symptom));
        } else {
            setQuizSymptoms([...quizSymptoms, symptom]);
        }
    };

    const runQuizAnalysis = () => {
        let recs = [];
        if (quizSymptoms.includes('Fatigue & Weakness')) recs.push(TEST_DATABASE[0]);
        if (quizSymptoms.includes('Frequent Thirst / Urination')) recs.push(TEST_DATABASE[1], TEST_DATABASE[2]);
        if (quizSymptoms.includes('Chest Pressure / High Work Stress')) recs.push(TEST_DATABASE[4]);
        if (parseInt(quizAge) > 40 || quizSymptoms.includes('General Health Checkup')) recs.push(TEST_DATABASE[5]);
        
        if (recs.length === 0) recs.push(TEST_DATABASE[0], TEST_DATABASE[1]);
        setQuizResultTests([...new Set(recs)]);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 selection:bg-[#97D739] selection:text-[#00381b]">
            
            {/* HERO SECTION */}
            <section className="relative py-20 px-4 sm:px-8 text-center overflow-hidden bg-gradient-to-b from-[#00381b] via-[#004d26] to-slate-950">
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
                        <Sparkles size={14} className="animate-spin" /> ISO 15189 Accredited Diagnostic Center
                    </div>
                    
                    <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight">
                        Lab Tests & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#86EFAC] to-[#97D739]">Digital Reports</span>
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
                        Search test pricing, check prep guides, compare packages, or access instant digital lab reports.
                    </p>

                    <div className="pt-6 flex flex-wrap justify-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab('tests')}
                            className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
                                activeTab === 'tests' 
                                    ? 'bg-[#97D739] text-[#00381b] shadow-xl shadow-[#97D739]/20' 
                                    : 'bg-slate-900/80 text-slate-300 border border-slate-800'
                            }`}
                        >
                            <Search size={16} />
                            <span>Browse Tests</span>
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab('portal')}
                            className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
                                activeTab === 'portal' 
                                    ? 'bg-[#97D739] text-[#00381b] shadow-xl shadow-[#97D739]/20' 
                                    : 'bg-slate-900/80 text-slate-300 border border-[#97D739]/40'
                            }`}
                        >
                            <FileText size={16} />
                            <span>Download Report</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsQuizOpen(true)}
                            className="px-5 py-3 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg flex items-center gap-2"
                        >
                            <Stethoscope size={16} />
                            <span>Health Quiz & Calculator</span>
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* QUALITY BADGES */}
            <section className="max-w-6xl mx-auto px-4 sm:px-8 -mt-6 relative z-20">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center backdrop-blur-md shadow-2xl">
                    <div className="p-2 space-y-1">
                        <Award size={20} className="text-[#97D739] mx-auto" />
                        <h4 className="text-xs font-black text-white">ISO 15189 Certified</h4>
                        <p className="text-[10px] text-slate-400 font-medium">International Lab standard</p>
                    </div>
                    <div className="p-2 space-y-1">
                        <ShieldCheck size={20} className="text-[#97D739] mx-auto" />
                        <h4 className="text-xs font-black text-white">Fully Automated</h4>
                        <p className="text-[10px] text-slate-400 font-medium">Roche Diagnostics</p>
                    </div>
                    <div className="p-2 space-y-1">
                        <Clock size={20} className="text-[#97D739] mx-auto" />
                        <h4 className="text-xs font-black text-white">Same Day Reports</h4>
                        <p className="text-[10px] text-slate-400 font-medium">Fast online access</p>
                    </div>
                    <div className="p-2 space-y-1">
                        <Home size={20} className="text-[#97D739] mx-auto" />
                        <h4 className="text-xs font-black text-white">Home Collection</h4>
                        <p className="text-[10px] text-slate-400 font-medium">Certified Phlebotomists</p>
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
                                    placeholder="Search test name (e.g. CBC, Diabetes)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#97D739]"
                                />
                            </div>

                            <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
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

                        {/* CARDS GRID WITH IMAGES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTests.map((test, index) => {
                                const isCompared = compareList.some(item => item.id === test.id);
                                return (
                                    <motion.div 
                                        key={test.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 }}
                                        whileHover={{ y: -8 }}
                                        className="bg-slate-900/80 border border-slate-800 hover:border-[#97D739] rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group relative shadow-xl"
                                    >
                                        <div>
                                            {/* IMAGE CONTAINER */}
                                            <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                                                <img 
                                                    src={test.image} 
                                                    alt={test.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />
                                                
                                                {/* BADGES ON IMAGE */}
                                                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                                                    <span className="text-[10px] font-black uppercase text-[#00381b] bg-[#97D739] px-3 py-1 rounded-full shadow-lg">
                                                        {test.category}
                                                    </span>
                                                    <button
                                                        onClick={() => toggleCompare(test)}
                                                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 backdrop-blur-md transition ${
                                                            isCompared 
                                                                ? 'bg-[#007A3D] text-[#97D739] border border-[#97D739]' 
                                                                : 'bg-slate-950/80 text-slate-300 border border-slate-700 hover:text-white'
                                                        }`}
                                                    >
                                                        <SlidersHorizontal size={12} /> {isCompared ? 'Added' : 'Compare'}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* CONTENT */}
                                            <div className="p-6">
                                                <h3 className="text-lg font-black text-white group-hover:text-[#97D739] transition-colors">{test.name}</h3>
                                                <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed line-clamp-2">{test.desc}</p>

                                                <div className="mt-5 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300 font-semibold">
                                                    <div className="flex items-center gap-2">
                                                        <Clock size={14} className="text-[#97D739]" />
                                                        <span>Report Delivery: {test.time}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-amber-400">
                                                        <span className="flex items-center gap-1">
                                                            <AlertCircle size={14} /> Prep: {test.prep}
                                                        </span>
                                                        <button 
                                                            onClick={() => setSelectedPrepTest(test)}
                                                            className="text-[10px] underline text-[#97D739] font-bold hover:text-white"
                                                        >
                                                            Prep Guide
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* FOOTER */}
                                        <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
                                            <div>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Fee</span>
                                                <span className="text-xl font-black text-[#97D739]">{test.price}</span>
                                            </div>
                                            <motion.button 
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => alert(`Selected ${test.name} for booking.`)}
                                                className="bg-[#007A3D] hover:bg-[#004d26] text-white px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all shadow-md"
                                            >
                                                <span>Book Test</span>
                                                <ArrowRight size={14} />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                );
                            })}
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
                                    <h2 className="text-xl sm:text-2xl font-black text-white">Patient Report Download</h2>
                                    <p className="text-xs text-slate-400 font-medium">Enter your Invoice/Patient ID and registered mobile number.</p>
                                </div>
                            </div>

                            <form onSubmit={handleReportSearch} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-300 mb-1.5">Invoice No / Patient ID</label>
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
                                    <label className="block text-xs font-black uppercase text-slate-300 mb-1.5">Registered Mobile Number</label>
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
                                    className="w-full bg-[#97D739] hover:bg-white text-[#00381b] py-3.5 rounded-xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>Searching Medical Database...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Search size={18} />
                                            <span>Find Lab Report</span>
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
                                                    {reportResult.status}
                                                </span>
                                                <span className="text-xs text-slate-400 font-bold">{reportResult.date}</span>
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-black text-white">{reportResult.patientName}</h4>
                                                <p className="text-xs text-slate-400 font-bold">Invoice: {reportResult.invoiceNo}</p>
                                            </div>

                                            <div className="text-xs text-slate-300 font-semibold space-y-1 border-t border-slate-900 pt-3">
                                                <p><span className="text-slate-500">Test Ordered:</span> {reportResult.testName}</p>
                                                <p><span className="text-slate-500">Signatory:</span> {reportResult.doctor}</p>
                                            </div>

                                            <motion.a 
                                                whileTap={{ scale: 0.95 }}
                                                href="#download" 
                                                onClick={(e) => { e.preventDefault(); alert('Downloading official lab report PDF...'); }}
                                                className="w-full bg-[#007A3D] hover:bg-[#004d26] text-[#86EFAC] hover:text-white py-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all border border-[#97D739]/30 mt-3 shadow-md"
                                            >
                                                <Download size={18} />
                                                <span>Download Official PDF Report</span>
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PATHOLOGISTS SECTION */}
            <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-20">
                <div className="text-center space-y-2 mb-8">
                    <span className="text-xs font-black uppercase text-[#97D739] tracking-widest">Medical Experts</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">Our Senior Pathologists</h2>
                    <p className="text-slate-400 text-xs sm:text-sm">Reports are reviewed and digitally signed by certified specialists.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PATHOLOGISTS.map((doc, idx) => (
                        <div key={idx} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl flex items-center gap-4">
                            <div className="p-4 bg-[#007A3D]/40 text-[#97D739] rounded-2xl border border-[#97D739]/30 shrink-0">
                                <UserCheck size={32} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-base sm:text-lg font-black text-white">{doc.name}</h3>
                                <p className="text-xs text-[#97D739] font-bold">{doc.title}</p>
                                <p className="text-xs text-slate-300 font-medium">{doc.degrees}</p>
                                <span className="inline-block text-[10px] bg-slate-950 text-slate-400 px-2.5 py-0.5 rounded-full font-bold border border-slate-800 mt-1">
                                    {doc.exp}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="max-w-4xl mx-auto px-4 sm:px-8 mt-20">
                <div className="text-center space-y-2 mb-8">
                    <span className="text-xs font-black uppercase text-[#97D739] tracking-widest">Got Questions?</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-3">
                    {FAQS.map((faq, index) => (
                        <div key={index} className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full text-left p-4 sm:p-5 flex justify-between items-center text-sm font-black text-white hover:text-[#97D739] transition"
                            >
                                <span>{faq.q}</span>
                                {openFaq === index ? <ChevronUp size={18} className="text-[#97D739]" /> : <ChevronDown size={18} className="text-slate-400" />}
                            </button>
                            <AnimatePresence>
                                {openFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-4 pb-5 sm:px-5 text-xs text-slate-300 font-medium leading-relaxed border-t border-slate-800/50 pt-3"
                                    >
                                        {faq.a}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* FLOATING COMPARE BAR */}
            {compareList.length > 0 && (
                <motion.div 
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border-2 border-[#97D739] p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-40 max-w-lg w-11/12"
                >
                    <div className="text-xs font-black text-white">
                        <span>Comparing <span className="text-[#97D739]">{compareList.length}</span> tests</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <button 
                            onClick={() => setIsCompareOpen(true)}
                            className="bg-[#97D739] text-[#00381b] px-4 py-2 rounded-xl text-xs font-black shadow"
                        >
                            Compare Side-by-Side
                        </button>
                        <button 
                            onClick={() => setCompareList([])}
                            className="p-2 text-slate-400 hover:text-white"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}

            {/* PREPARATION GUIDE MODAL */}
            <AnimatePresence>
                {selectedPrepTest && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 border-2 border-[#97D739] rounded-3xl p-6 max-w-lg w-full relative shadow-2xl space-y-4"
                        >
                            <button 
                                onClick={() => setSelectedPrepTest(null)}
                                className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-400 hover:text-white rounded-full z-10"
                            >
                                <X size={18} />
                            </button>

                            <div className="flex items-center gap-3">
                                <img src={selectedPrepTest.image} alt={selectedPrepTest.name} className="w-12 h-12 rounded-xl object-cover border border-[#97D739]" />
                                <div>
                                    <h3 className="text-lg font-black text-white">Preparation Guide</h3>
                                    <p className="text-xs text-[#97D739] font-bold">{selectedPrepTest.name}</p>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2 text-xs">
                                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-300 font-semibold">
                                    <Droplet size={16} className="text-cyan-400 shrink-0" />
                                    <span>Water Guidelines: {selectedPrepTest.waterRule}</span>
                                </div>

                                <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl space-y-1">
                                    <h4 className="font-black text-emerald-400 uppercase text-[10px]">What to DO (করণীয়):</h4>
                                    <ul className="list-disc list-inside text-slate-300 font-medium space-y-1">
                                        {selectedPrepTest.dos.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>

                                <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-xl space-y-1">
                                    <h4 className="font-black text-rose-400 uppercase text-[10px]">What NOT to DO (বর্জনীয়):</h4>
                                    <ul className="list-disc list-inside text-slate-300 font-medium space-y-1">
                                        {selectedPrepTest.donts.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* HEALTH QUIZ MODAL */}
            <AnimatePresence>
                {isQuizOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 border-2 border-amber-500 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl space-y-5"
                        >
                            <button 
                                onClick={() => setIsQuizOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-400 hover:text-white rounded-full"
                            >
                                <X size={18} />
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl">
                                    <Stethoscope size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white">Health Test Calculator</h3>
                                    <p className="text-xs text-slate-400">বয়স, লিঙ্গ ও উপসর্গ দিয়ে টেস্টের সেরা সাজেশন পান</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Age (বয়স)</label>
                                        <input 
                                            type="number" 
                                            placeholder="e.g. 35"
                                            value={quizAge}
                                            onChange={(e) => setQuizAge(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-amber-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Gender (লিঙ্গ)</label>
                                        <select 
                                            value={quizGender} 
                                            onChange={(e) => setQuizGender(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-amber-500"
                                        >
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Symptoms / Health Needs</label>
                                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                                        {['Fatigue & Weakness', 'Frequent Thirst / Urination', 'Chest Pressure / High Work Stress', 'General Health Checkup'].map(symptom => (
                                            <button
                                                key={symptom}
                                                onClick={() => toggleSymptom(symptom)}
                                                className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between border ${
                                                    quizSymptoms.includes(symptom)
                                                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                                                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                                                }`}
                                            >
                                                <span>{symptom}</span>
                                                {quizSymptoms.includes(symptom) && <CheckCircle2 size={14} className="text-amber-400" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    onClick={runQuizAnalysis}
                                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-3 rounded-xl font-black text-xs transition"
                                >
                                    Calculate Recommended Tests
                                </button>
                            </div>

                            {/* QUIZ RESULTS */}
                            {quizResultTests.length > 0 && (
                                <div className="pt-3 border-t border-slate-800 space-y-2">
                                    <h4 className="text-xs font-black uppercase text-[#97D739]">Recommended Tests:</h4>
                                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                                        {quizResultTests.map(t => (
                                            <div key={t.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                                                <div className="flex items-center gap-2">
                                                    <img src={t.image} alt={t.name} className="w-8 h-8 rounded-lg object-cover" />
                                                    <div>
                                                        <p className="font-black text-white">{t.name}</p>
                                                        <p className="text-[#97D739] font-bold">{t.price}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => { setIsQuizOpen(false); alert(`Booked ${t.name}`); }} className="bg-[#007A3D] text-white px-3 py-1 rounded-lg font-black text-[10px]">
                                                    Book
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* SIDE-BY-SIDE COMPARE MODAL */}
            <AnimatePresence>
                {isCompareOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 border-2 border-[#97D739] rounded-3xl p-6 max-w-4xl w-full relative shadow-2xl overflow-x-auto"
                        >
                            <button 
                                onClick={() => setIsCompareOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-400 hover:text-white rounded-full z-10"
                            >
                                <X size={18} />
                            </button>

                            <h3 className="text-xl font-black text-white mb-6">Compare Test Packages</h3>

                            <div className="grid grid-cols-4 gap-4 text-xs min-w-[600px]">
                                <div className="font-bold text-slate-500 space-y-6 pt-24">
                                    <p>Price</p>
                                    <p>Category</p>
                                    <p>Turnaround</p>
                                    <p>Preparation</p>
                                    <p>Home Sample</p>
                                </div>

                                {compareList.map(t => (
                                    <div key={t.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-6 text-center">
                                        <img src={t.image} alt={t.name} className="w-16 h-16 rounded-xl object-cover mx-auto" />
                                        <h4 className="font-black text-white h-8 flex items-center justify-center">{t.name}</h4>
                                        <p className="font-black text-[#97D739] text-base">{t.price}</p>
                                        <p className="text-slate-300 font-semibold">{t.category}</p>
                                        <p className="text-slate-300 font-semibold">{t.time}</p>
                                        <p className="text-amber-400 font-semibold">{t.prep}</p>
                                        <p className="text-slate-300 font-semibold">{t.homeSample ? 'Available' : 'Lab Visit Only'}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}