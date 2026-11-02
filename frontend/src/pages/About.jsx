import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Info, Target, History, Users, HeartHandshake, CheckCircle, Award, Sparkles, 
    Star, Quote, ShieldCheck, Heart, Zap, Lightbulb, Loader2 
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const STORAGE_KEY = 'site_lang';

const NAV_ITEMS = [
    { id: 'who-we-are', labelEn: 'Who We Are', labelBn: 'আমরা কারা', icon: Info },
    { id: 'certifications', labelEn: 'Certifications', labelBn: 'অনুমোদন ও স্বীকৃতি', icon: Award },
    { id: 'vision-mission', labelEn: 'Vision & Mission', labelBn: 'লক্ষ্য ও উদ্দেশ্য', icon: Target },
    { id: 'our-journey', labelEn: 'Our Journey', labelBn: 'আমাদের পথচলা', icon: History },
    { id: 'executive-committee', labelEn: 'Committee', labelBn: 'কমিটি', icon: Users },
    { id: 'core-values', labelEn: 'Core Values', labelBn: 'মূল মূল্যবোধ', icon: HeartHandshake },
    { id: 'patient-reviews', labelEn: 'Reviews', labelBn: 'রিভিউসমূহ', icon: Star },
];

const ICON_MAP = {
    ShieldCheck: ShieldCheck,
    Heart: Heart,
    Zap: Zap,
    Lightbulb: Lightbulb
};

export default function About() {
    const { hash } = useLocation();
    const [activeTab, setActiveTab] = useState('who-we-are');
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [lang, setLang] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'bn';
        } catch {
            return 'bn';
        }
    });

    useEffect(() => {
        const handleLangChange = () => {
            setLang(localStorage.getItem(STORAGE_KEY) || 'bn');
        };
        window.addEventListener('languageChange', handleLangChange);
        return () => window.removeEventListener('languageChange', handleLangChange);
    }, []);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/about/`);
                if (res.ok) {
                    const data = await res.json();
                    setPageData(data);
                }
            } catch (err) {
                console.error("API load failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAboutData();
    }, []);

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            setActiveTab(id);
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [hash]);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        setActiveTab(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex items-center gap-2 text-[#007A3D] font-bold">
                    <Loader2 className="animate-spin" size={24} />
                    <span>Loading About Details...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* HERO BANNER */}
            <div className="relative bg-gradient-to-r from-[#005c2e] via-[#007A3D] to-[#005c2e] text-white py-20 px-4">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-[#97D739] text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                        <Sparkles size={14} /> {lang === 'bn' ? 'উন্নতমানের চিকিৎসা সেবা' : 'Exceptional Medical Care'}
                    </span>
                    <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tight">
                        {lang === 'bn' ? 'আমাদের ' : 'About '} 
                        <span className="text-[#97D739]">{lang === 'bn' ? 'প্রাইম ক্লিনিক' : 'Prime Clinic'}</span>
                    </h1>
                </motion.div>
            </div>

            {/* QUICK NAV */}
            <nav className="sticky top-20 z-40 bg-white/90 backdrop-blur-md shadow-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <a key={item.id} href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                                    isActive ? 'bg-[#007A3D] text-white shadow-md' : 'bg-slate-100 text-slate-600'
                                }`}>
                                <Icon size={16} className={isActive ? 'text-[#97D739]' : 'text-slate-500'} />
                                <span>{lang === 'bn' ? item.labelBn : item.labelEn}</span>
                            </a>
                        );
                    })}
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
                {/* 1. WHO WE ARE */}
                <section id="who-we-are" className="scroll-mt-36">
                    <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-emerald-100 text-[#007A3D] rounded-2xl"><Info size={30} /></div>
                            <div>
                                <h2 className="text-2xl sm:text-4xl font-bold text-slate-800">{lang === 'bn' ? 'আমরা কারা' : 'Who We Are'}</h2>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div className="space-y-4 text-slate-600">
                                <p><strong className="text-slate-800">{lang === 'bn' ? 'প্রাইম ক্লিনিক' : 'Prime Clinic'}</strong> {lang === 'bn' ? 'হলো একটি আধুনিক চিকিৎসা ও প্যাথলজি সেন্টার।' : 'is a leading healthcare & diagnostic facility.'}</p>
                                <div className="grid sm:grid-cols-2 gap-3 pt-4">
                                    {pageData?.features?.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-slate-700 font-semibold text-sm border border-emerald-100">
                                            <CheckCircle size={18} className="text-[#007A3D] shrink-0" />
                                            <span>{lang === 'bn' ? f.title_bn : f.title_en}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. CERTIFICATIONS */}
                <section id="certifications" className="scroll-mt-36">
                    <div className="bg-gradient-to-br from-emerald-900 to-[#007A3D] text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
                        <h2 className="text-2xl sm:text-4xl font-bold mb-8">{lang === 'bn' ? 'অনুমোদন ও আন্তর্জাতিক স্বীকৃতি' : 'Approved & Certified By'}</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {pageData?.certifications?.map((cert, idx) => (
                                <div key={idx} className="bg-white/10 p-6 rounded-2xl border border-white/15">
                                    <span className="text-[11px] font-bold text-[#97D739] uppercase bg-white/10 px-2 py-1 rounded">{lang === 'bn' ? cert.org_bn : cert.org_en}</span>
                                    <h3 className="text-xl font-bold mt-3 mb-2">{lang === 'bn' ? cert.title_bn : cert.title_en}</h3>
                                    <p className="text-emerald-100 text-xs">{lang === 'bn' ? cert.desc_bn : cert.desc_en}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. OUR JOURNEY */}
                <section id="our-journey" className="scroll-mt-36">
                    <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-slate-100">
                        <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-8">{lang === 'bn' ? 'আমাদের পথচলা' : 'Our Journey'}</h2>
                        <div className="border-l-4 border-emerald-100 ml-4 space-y-8 pl-6">
                            {pageData?.milestones?.map((item, idx) => (
                                <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                    <span className="text-xs font-bold text-[#007A3D] bg-emerald-100 px-3 py-1 rounded-full">{lang === 'bn' ? item.year_bn : item.year_en}</span>
                                    <h3 className="font-bold text-slate-800 text-xl mt-3">{lang === 'bn' ? item.title_bn : item.title_en}</h3>
                                    <p className="text-slate-600 mt-1 text-sm">{lang === 'bn' ? item.desc_bn : item.desc_en}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. EXECUTIVE COMMITTEE */}
                <section id="executive-committee" className="scroll-mt-36">
                    <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-8">{lang === 'bn' ? 'কার্যনির্বাহী কমিটি' : 'Executive Committee'}</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pageData?.committee?.map((member, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl text-center border border-slate-100">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-emerald-100 border-2 border-[#007A3D]">
                                    {member.image ? <img src={member.image} alt="Member" className="w-full h-full object-cover" /> : <Users className="m-auto mt-6 text-[#007A3D]" size={40} />}
                                </div>
                                <h3 className="font-bold text-slate-800 text-xl">{lang === 'bn' ? member.name_bn : member.name_en}</h3>
                                <p className="text-[#007A3D] text-xs font-bold mt-1">{lang === 'bn' ? member.role_bn : member.role_en}</p>
                                <p className="text-slate-500 text-xs mt-2">{lang === 'bn' ? member.degree_bn : member.degree_en}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. PATIENT REVIEWS */}
                <section id="patient-reviews" className="scroll-mt-36">
                    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-12 shadow-2xl">
                        <h2 className="text-2xl sm:text-4xl font-bold mb-8">{lang === 'bn' ? 'রোগীদের অভিজ্ঞতা ও রিভিউ' : 'Patient Reviews'}</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {pageData?.reviews?.map((review, idx) => (
                                <div key={idx} className="bg-white/10 p-6 rounded-2xl border border-white/15">
                                    <div className="flex text-[#97D739] mb-2">
                                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} className="fill-[#97D739]" />)}
                                    </div>
                                    <p className="text-xs text-slate-200 italic mb-4">"{lang === 'bn' ? review.review_bn : review.review_en}"</p>
                                    <h4 className="font-bold text-white text-sm">{lang === 'bn' ? review.name_bn : review.name_en}</h4>
                                    <p className="text-[11px] text-[#97D739]">{lang === 'bn' ? review.service_bn : review.service_en}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}