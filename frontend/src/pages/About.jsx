import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Info, 
    Target, 
    History, 
    Users, 
    HeartHandshake, 
    CheckCircle, 
    Award,
    Sparkles,
    Star,
    Quote,
    ShieldCheck,
    Heart,
    Zap,
    Lightbulb
} from 'lucide-react';

// ডাটা কনফিগারেশন
const NAV_ITEMS = [
    { id: 'who-we-are', label: 'Who We Are', icon: Info },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'vision-mission', label: 'Vision & Mission', icon: Target },
    { id: 'our-journey', label: 'Our Journey', icon: History },
    { id: 'executive-committee', label: 'Committee', icon: Users },
    { id: 'core-values', label: 'Core Values', icon: HeartHandshake },
    { id: 'patient-reviews', label: 'Reviews', icon: Star },
];

const FEATURES = [
    '24/7 Diagnostic & Emergency',
    'Board Certified Specialists',
    'Fully Automated Labs',
    'Affordable Healthcare'
];

const CERTIFICATIONS = [
    { title: 'DGHS Approved', org: 'Directorate General of Health Services', desc: 'Fully licensed & registered healthcare facility under the Ministry of Health Bangladesh.' },
    { title: 'ISO 9001:2015', org: 'International Standard', desc: 'Certified Quality Management System ensuring modern diagnostic standards.' },
    { title: 'BMDC Registered', org: 'Bangladesh Medical & Dental Council', desc: 'All doctors and consultants are registered and verified medical practitioners.' },
    { title: 'BAEC Licensed', org: 'Atomic Energy Commission', desc: 'Strict radiation safety measures applied for all Radiology, X-Ray & CT Scan services.' }
];

const MILESTONES = [
    { year: '2015', title: 'Beginning of Prime Clinic', desc: 'Started with 5 basic specialist consultation chambers and a small diagnostic lab.' },
    { year: '2019', title: 'Diagnostic Center Upgrade', desc: 'Introduced 1.5T MRI, 128-Slice CT Scan, and 24/7 automated biochemistry analyzers.' },
    { year: '2023', title: 'Multi-Specialty Facility', desc: 'Expanded into 15+ specialized departments with over 40+ renowned professors and doctors.' },
    { year: '2026', title: 'Smart Healthcare Integration', desc: 'Launched online diagnostic reporting, automated appointment systems, and digital health records.' }
];

const COMMITTEE_MEMBERS = [
    { name: 'Dr. Rahman Khan', role: 'Chairman & Founder', degree: 'MBBS, FCPS (Medicine)', image: null },
    { name: 'Dr. Nusrat Jahan', role: 'Managing Director', degree: 'MBBS, MD (Cardiology)', image: null },
    { name: 'Prof. S. M. Ali', role: 'Head of Clinical Services', degree: 'FRCP (London), FCPS', image: null }
];

const CORE_VALUES = [
    { title: 'Integrity', desc: '100% transparent diagnostic results and medical guidance.', icon: ShieldCheck, color: 'from-emerald-500 to-teal-600' },
    { title: 'Compassion', desc: 'Treating patients with human warmth, dignity, and empathy.', icon: Heart, color: 'from-rose-500 to-pink-600' },
    { title: 'Excellence', desc: 'Relentless effort to achieve the highest diagnostic precision.', icon: Zap, color: 'from-amber-500 to-orange-600' },
    { title: 'Innovation', desc: 'Continual adoption of modern diagnostic technology.', icon: Lightbulb, color: 'from-blue-500 to-indigo-600' }
];

const REVIEWS = [
    {
        name: 'Tanvir Ahmed',
        service: 'MRI & Cardiology Patient',
        review: 'Prime Clinic provides incredible diagnostic accuracy. Received my MRI report within 4 hours, and Dr. Rahman explained everything thoroughly.',
        rating: 5,
        date: '2 weeks ago'
    },
    {
        name: 'Sabrina Islam',
        service: 'General Health Checkup',
        review: 'The staff behavior and environment are top-class. Online appointment system saved me hours of waiting time. Highly recommended!',
        rating: 5,
        date: '1 month ago'
    },
    {
        name: 'Mahbub Hasan',
        service: 'Orthopedic Consultation',
        review: 'Extremely professional diagnostic testing. The lab facilities are world-class and prices are quite reasonable compared to others.',
        rating: 5,
        date: '3 weeks ago'
    }
];

// Framer Motion Variants (অ্যানিমেশন কন্ট্রোলার)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
};

export default function About() {
    const { hash } = useLocation();
    const [activeTab, setActiveTab] = useState('who-we-are');

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            setActiveTab(id);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [hash]);

    useEffect(() => {
        const handleObserver = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleObserver, {
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        });

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            
            {/* HERO BANNER */}
            <div className="relative bg-gradient-to-r from-[#005c2e] via-[#007A3D] to-[#005c2e] text-white py-20 px-4">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-[#97D739] text-xs font-bold uppercase tracking-wider mb-4 border border-white/10 backdrop-blur-sm">
                        <Sparkles size={14} /> Exceptional Medical Care
                    </span>
                    
                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-tight">
                        About <span className="text-[#97D739]">Prime Clinic</span>
                    </h1>
                    
                    <p className="text-emerald-100 mt-4 text-base sm:text-lg max-w-2xl mx-auto font-light">
                        Delivering world-class healthcare with compassionate treatment, advanced technology, and certified diagnostic standards.
                    </p>
                </motion.div>
            </div>

            {/* QUICK NAVIGATION BAR */}
            <nav className="sticky top-20 z-40 bg-white/90 backdrop-blur-md shadow-md border-b border-slate-200" aria-label="About Page Navigation">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto py-3 no-scrollbar scroll-smooth">
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => scrollToSection(e, item.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                                        isActive
                                            ? 'bg-[#007A3D] text-white shadow-md shadow-emerald-700/20 scale-105'
                                            : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-[#007A3D]'
                                    }`}
                                >
                                    <Icon size={16} className={isActive ? 'text-[#97D739]' : 'text-slate-500'} />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

                {/* 1. WHO WE ARE */}
                <section id="who-we-are" className="scroll-mt-36">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-slate-100"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-emerald-100 text-[#007A3D] rounded-2xl shadow-inner">
                                <Info size={30} />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-4xl font-bold text-slate-800">Who We Are</h2>
                                <p className="text-slate-500 text-sm">Pioneering diagnostic & consultative excellence</p>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div className="space-y-5 text-slate-600 leading-relaxed text-base">
                                <p>
                                    <strong className="text-slate-800 font-semibold">Prime Clinic</strong> is a leading healthcare & diagnostic facility committed to delivering clinical accuracy and patient-centered treatment.
                                </p>
                                <p>
                                    With over a decade of healthcare service, our facility combines top-tier doctor expertise with fully automated, international standard laboratory technology.
                                </p>
                                
                                <div className="grid sm:grid-cols-2 gap-3 pt-4">
                                    {FEATURES.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/60 text-slate-700 font-semibold text-sm border border-emerald-100">
                                            <CheckCircle size={18} className="text-[#007A3D] shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                                <div className="relative aspect-video w-full">
                                    <iframe 
                                        className="w-full h-full rounded-2xl"
                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0" 
                                        title="Prime Clinic Walkthrough"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 2. CERTIFICATIONS */}
                <section id="certifications" className="scroll-mt-36">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-emerald-900 via-[#005c2e] to-[#007A3D] text-white rounded-3xl p-8 sm:p-12 shadow-2xl"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-white/10 text-[#97D739] rounded-2xl backdrop-blur-md">
                                <Award size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-4xl font-bold">Approved & Certified By</h2>
                                <p className="text-emerald-200 text-sm">Recognized by national and international health organizations</p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {CERTIFICATIONS.map((cert, idx) => (
                                <motion.div 
                                    key={idx}
                                    whileHover={{ y: -6 }}
                                    className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15"
                                >
                                    <span className="text-xs font-bold text-[#97D739] uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-md">
                                        {cert.org}
                                    </span>
                                    <h3 className="text-xl font-bold mt-3 mb-2">{cert.title}</h3>
                                    <p className="text-emerald-100 text-xs leading-relaxed">{cert.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 3. VISION & MISSION */}
                <section id="vision-mission" className="scroll-mt-36">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-emerald-100 text-[#007A3D] rounded-2xl shadow-inner">
                            <Target size={30} />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-bold text-slate-800">Our Vision & Mission</h2>
                            <p className="text-slate-500 text-sm">Guided by purpose and standard of care</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div 
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border-t-8 border-[#007A3D]"
                        >
                            <span className="text-xs font-bold uppercase tracking-widest text-[#007A3D] bg-emerald-100 px-3 py-1 rounded-full">Vision</span>
                            <h3 className="text-2xl font-bold text-slate-800 mt-4 mb-3">Setting Global Healthcare Standards</h3>
                            <p className="text-slate-600 leading-relaxed">
                                To be recognized as a leading benchmark in diagnostic accuracy and patient treatment by constantly adopting cutting-edge technology and world-class medical talents.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border-t-8 border-[#97D739]"
                        >
                            <span className="text-xs font-bold uppercase tracking-widest text-[#007A3D] bg-lime-100 px-3 py-1 rounded-full">Mission</span>
                            <h3 className="text-2xl font-bold text-slate-800 mt-4 mb-3">Accessible & Ethical Care</h3>
                            <p className="text-slate-600 leading-relaxed">
                                To deliver reliable diagnostic test results, empathetic patient consultation, and affordable treatment through integrity, compliance, and strict ethical standards.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 4. OUR JOURNEY */}
                <section id="our-journey" className="scroll-mt-36">
                    <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-slate-100">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-3 bg-emerald-100 text-[#007A3D] rounded-2xl shadow-inner">
                                <History size={30} />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-4xl font-bold text-slate-800">Our Journey</h2>
                                <p className="text-slate-500 text-sm">Key milestones over the years</p>
                            </div>
                        </div>

                        <div className="relative border-l-4 border-emerald-100 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
                            {MILESTONES.map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 bg-white border-4 border-[#007A3D] rounded-full group-hover:bg-[#97D739] transition duration-300"></div>

                                    <div className="bg-slate-50 hover:bg-emerald-50/60 p-5 rounded-2xl border border-slate-100 transition duration-300">
                                        <span className="text-xs font-extrabold text-[#007A3D] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                                            {item.year}
                                        </span>
                                        <h3 className="font-bold text-slate-800 text-xl mt-3">{item.title}</h3>
                                        <p className="text-slate-600 mt-1 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. EXECUTIVE COMMITTEE (UPDATED WITH STYLISH ANIMATIONS) */}
                <section id="executive-committee" className="scroll-mt-36">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-emerald-100 text-[#007A3D] rounded-2xl shadow-inner">
                            <Users size={30} />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-bold text-slate-800">Executive Committee</h2>
                            <p className="text-slate-500 text-sm">Meet the leaders guiding our vision</p>
                        </div>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {COMMITTEE_MEMBERS.map((member, idx) => (
                            <motion.div 
                                key={idx}
                                variants={cardVariants}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="group relative bg-white p-8 rounded-3xl shadow-xl text-center border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-emerald-200"
                            >
                                {/* Top Decorative Gradient Accent Line */}
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#007A3D] via-[#97D739] to-[#007A3D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Avatar Circle with Pulse Effect */}
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <div className="absolute inset-0 bg-emerald-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                                    <div className="relative w-full h-full bg-gradient-to-tr from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <Users size={48} className="text-[#007A3D] group-hover:scale-110 transition-transform duration-300" />
                                        )}
                                    </div>
                                </div>

                                {/* Member Information */}
                                <h3 className="font-bold text-slate-800 text-xl group-hover:text-[#007A3D] transition-colors duration-300">
                                    {member.name}
                                </h3>
                                
                                <div className="mt-2 inline-block px-3 py-1 bg-emerald-50 text-[#007A3D] rounded-full text-xs font-bold border border-emerald-100">
                                    {member.role}
                                </div>
                                
                                <p className="text-slate-500 text-xs mt-3 font-medium bg-slate-50 py-2 px-3 rounded-xl border border-slate-100">
                                    {member.degree}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* 6. OUR CORE VALUES (UPDATED WITH STYLISH ANIMATIONS) */}
                <section id="core-values" className="scroll-mt-36">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-slate-100 relative overflow-hidden"
                    >
                        {/* Subtle Floating Background Circle Accent */}
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-50 rounded-full blur-3xl -z-0 pointer-events-none"></div>

                        <div className="relative z-10 flex items-center gap-3 mb-10">
                            <div className="p-3 bg-emerald-100 text-[#007A3D] rounded-2xl shadow-inner">
                                <HeartHandshake size={30} />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-4xl font-bold text-slate-800">Our Core Values</h2>
                                <p className="text-slate-500 text-sm">Principles that drive our daily actions</p>
                            </div>
                        </div>

                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {CORE_VALUES.map((val, idx) => {
                                const IconComponent = val.icon;
                                return (
                                    <motion.div 
                                        key={idx}
                                        variants={cardVariants}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className="group bg-slate-50/80 hover:bg-white p-6 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-6">
                                                {/* Animated Gradient Icon Container */}
                                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${val.color} text-white flex items-center justify-center shadow-md group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300`}>
                                                    <IconComponent size={24} />
                                                </div>
                                                {/* Card Number Badge */}
                                                <span className="text-xs font-black text-slate-300 group-hover:text-[#007A3D] transition-colors duration-300">
                                                    0{idx + 1}
                                                </span>
                                            </div>

                                            <h3 className="font-bold text-slate-800 text-xl mb-2 group-hover:text-[#007A3D] transition-colors duration-300">
                                                {val.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                {val.desc}
                                            </p>
                                        </div>

                                        {/* Bottom Highlight Indicator */}
                                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#007A3D] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span>Read Standard</span> &rarr;
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </section>

                {/* 7. PATIENT REVIEWS */}
                <section id="patient-reviews" className="scroll-mt-36">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white/10 text-[#97D739] rounded-2xl backdrop-blur-md">
                                    <Star size={30} className="fill-[#97D739]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl sm:text-4xl font-bold">Patient Reviews</h2>
                                    <p className="text-emerald-200 text-sm">Real experiences from our valued patients</p>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3 w-fit">
                                <span className="text-3xl font-black text-[#97D739]">4.9</span>
                                <div>
                                    <div className="flex gap-1 text-[#97D739]">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className="fill-[#97D739]" />
                                        ))}
                                    </div>
                                    <p className="text-xs text-emerald-200 mt-0.5">Based on 1,250+ reviews</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {REVIEWS.map((review, idx) => (
                                <motion.div 
                                    key={idx}
                                    whileHover={{ y: -8 }}
                                    className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 flex flex-col justify-between relative"
                                >
                                    <Quote size={40} className="absolute right-4 top-4 text-white/10 pointer-events-none" />
                                    
                                    <div>
                                        <div className="flex gap-1 text-[#97D739] mb-3">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} size={16} className="fill-[#97D739]" />
                                            ))}
                                        </div>

                                        <p className="text-emerald-100 text-sm leading-relaxed italic mb-6">
                                            "{review.review}"
                                        </p>
                                    </div>

                                    <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                                        <div>
                                            <h3 className="font-bold text-white text-base">{review.name}</h3>
                                            <p className="text-xs text-[#97D739] font-medium">{review.service}</p>
                                        </div>
                                        <span className="text-[10px] text-emerald-300/60 font-medium">{review.date}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

            </div>
        </div>
    );
}