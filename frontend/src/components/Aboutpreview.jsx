import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Target, History, Users, Sparkles } from 'lucide-react';

const TEXT = {
    en: {
        eyebrow: 'About Prime Clinic',
        title: 'Care You Can Trust, Results You Can Rely On',
        text: 'Combining board-certified medical specialists with fully automated diagnostic technology to provide accurate reports and compassionate healthcare under one roof.',
        cta: 'Learn More About Us',
        explore: 'Quick Explore',
        features: [
            { title: '24/7 Diagnostic & Emergency', desc: 'Round-the-clock medical care & testing' },
            { title: 'Board Certified Specialists', desc: 'Experienced doctors across departments' },
            { title: 'Fully Automated Labs', desc: 'ISO certified fast & accurate reports' },
            { title: 'Affordable Healthcare', desc: 'Quality diagnostic services for all' }
        ],
        links: {
            'vision-mission': 'Vision & Mission',
            'our-journey': 'Our Journey',
            'executive-committee': 'Committee'
        }
    },
    bn: {
        eyebrow: 'প্রাইম ক্লিনিক সম্পর্কে',
        title: 'যে সেবায় ভরসা রাখা যায়, যে ফলাফলে নির্ভর করা যায়',
        text: 'অভিজ্ঞ বিশেষজ্ঞ চিকিৎসক ও সম্পূর্ণ স্বয়ংক্রিয় ল্যাবরেটরি প্রযুক্তির সমন্বয়ে পটুয়াখালী প্রাইম ক্লিনিকে পাবেন নির্ভুল রিপোর্ট ও সহমর্মী স্বাস্থ্যসেবা।',
        cta: 'আমাদের সম্পর্কে আরও জানুন',
        explore: 'একনজরে দেখুন',
        features: [
            { title: '২৪/৭ ডায়াগনস্টিক ও জরুরি সেবা', desc: 'দিনরাত সার্বক্ষণিক চিকিৎসা ও প্যাথলজি সেবা' },
            { title: 'বোর্ড সনদপ্রাপ্ত বিশেষজ্ঞ', desc: 'বিভিন্ন বিভাগে অভিজ্ঞ প্রথিতযশা ডাক্তারবৃন্দ' },
            { title: 'সম্পূর্ণ স্বয়ংক্রিয় ল্যাব', desc: 'আইএসও মানসম্পন্ন দ্রুত ও নির্ভুল রিপোর্ট' },
            { title: 'সাশ্রয়ী স্বাস্থ্যসেবা', desc: 'সবার জন্য সহজলভ্য ও উন্নত সেবা' }
        ],
        links: {
            'vision-mission': 'ভিশন ও মিশন',
            'our-journey': 'আমাদের পথচলা',
            'executive-committee': 'কমিটি'
        }
    }
};

const QUICK_LINKS = [
    { id: 'vision-mission', icon: Target },
    { id: 'our-journey', icon: History },
    { id: 'executive-committee', icon: Users }
];

const STORAGE_KEY = 'site_lang';

export default function AboutPreview() {
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

    const t = TEXT[lang] || TEXT.bn;
    const isBn = lang === 'bn';

    return (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 relative overflow-hidden" aria-labelledby="home-about-title">
            
            {/* Background Glow Overlay */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#007A3D]/10 rounded-full blur-3xl pointer-events-none" />
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl relative z-10"
            >
                <div className="grid lg:grid-cols-12">
                    
                    {/* Left: Content Section */}
                    <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            
                            {/* Eyebrow Badge (No Local Language Switcher Here) */}
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#97D739] bg-[#007A3D]/20 border border-[#97D739]/30 px-3.5 py-1.5 rounded-full shadow-sm">
                                    <Sparkles size={13} />
                                    <span>{t.eyebrow}</span>
                                </span>
                            </div>

                            {/* Headline */}
                            <h2
                                id="home-about-title"
                                className={`text-2xl sm:text-4xl font-black text-white ${isBn ? 'leading-snug' : 'leading-tight'}`}
                            >
                                {t.title}
                            </h2>

                            {/* Body Paragraph */}
                            <p className={`text-slate-300 text-xs sm:text-sm font-medium leading-relaxed ${isBn ? 'leading-relaxed' : ''}`}>
                                {t.text}
                            </p>
                        </div>

                        {/* CTA & Explore Badges */}
                        <div className="space-y-5 pt-2">
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    to="/about"
                                    className="inline-flex items-center gap-2 bg-[#007A3D] hover:bg-[#005e2e] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-lg shadow-[#007A3D]/20 hover:gap-3 cursor-pointer border border-[#97D739]/30"
                                >
                                    <span>{t.cta}</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            {/* Quick Exploration Chips */}
                            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                                <span className="text-[11px] font-bold text-slate-400 mr-1">{t.explore}:</span>
                                {QUICK_LINKS.map(({ id, icon: Icon }) => (
                                    <Link
                                        key={id}
                                        to={`/about#${id}`}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 text-slate-300 hover:text-[#97D739] hover:border-[#97D739]/40 border border-slate-800 text-xs font-bold transition-all"
                                    >
                                        <Icon size={14} className="text-[#97D739]" />
                                        <span>{t.links[id]}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Feature Highlights Grid */}
                    <div className="lg:col-span-5 bg-gradient-to-br from-[#00381b] via-[#005c2e] to-slate-950 p-6 sm:p-10 lg:p-12 flex items-center border-t lg:border-t-0 lg:border-l border-slate-800 relative">
                        <div className="w-full space-y-3.5 relative z-10">
                            {t.features.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-[#97D739]/50 transition-all backdrop-blur-md shadow-lg group"
                                >
                                    <div className="p-2 rounded-xl bg-[#007A3D] text-[#97D739] shrink-0 mt-0.5 group-hover:bg-[#97D739] group-hover:text-[#00381b] transition-colors">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#97D739] transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-[11px] text-slate-300 font-medium mt-0.5">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}