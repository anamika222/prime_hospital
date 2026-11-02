import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Phone,
    Ambulance,
    MapPin,
    Mail,
    Menu,
    X,
    Calendar,
    ChevronDown,
    Info,
    Target,
    History,
    Users,
    HeartHandshake,
    Activity,
    Stethoscope,
    HeartPulse,
    Brain,
    Wind,
    Globe,
    Shield
} from 'lucide-react';

import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaYoutube
} from 'react-icons/fa';

const STORAGE_KEY = 'site_lang';

// ডিপার্টমেন্টের লিস্ট (Bilingual)
const DEPARTMENTS_LIST = [
    { nameEn: 'Orthopedics', nameBn: 'অর্থোপেডিক্স', hash: 'orthopedics', icon: Activity },
    { nameEn: 'Surgery', nameBn: 'সার্জারি', hash: 'surgery', icon: Stethoscope },
    { nameEn: 'Gynecology', nameBn: 'গাইনি ও প্রসূতি', hash: 'gynecology', icon: HeartPulse },
    { nameEn: 'Cardiology', nameBn: 'কার্ডিওলজি (হৃদরোগ)', hash: 'cardiology', icon: HeartPulse },
    { nameEn: 'Internal Medicine', nameBn: 'মেডিসিন', hash: 'internal-medicine', icon: Stethoscope },
    { nameEn: 'Neurosurgery', nameBn: 'নিউরোসার্জারি', hash: 'neurosurgery', icon: Brain },
    { nameEn: 'Pulmonology', nameBn: 'পালমোনোলজি (বক্ষব্যাধি)', hash: 'pulmonology', icon: Wind }
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // About state
    const [isAboutHovered, setIsAboutHovered] = useState(false);
    const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

    // Department state
    const [isDeptHovered, setIsDeptHovered] = useState(false);
    const [isMobileDeptOpen, setIsMobileDeptOpen] = useState(false);

    // Logo Image Error Fallback State
    const [logoError, setLogoError] = useState(false);

    // Global Language State
    const [lang, setLang] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'bn';
        } catch {
            return 'bn';
        }
    });

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    // Toggle Language Global Handler
    const handleLanguageToggle = () => {
        const nextLang = lang === 'bn' ? 'en' : 'bn';
        setLang(nextLang);
        try {
            localStorage.setItem(STORAGE_KEY, nextLang);
            window.dispatchEvent(new Event('languageChange'));
        } catch (e) {
            console.error("Storage error", e);
        }
    };

    return (
        <header className="w-full shadow-lg sticky top-0 z-50 bg-[#007A3D]">

            {/* ==================== 1. TOP BAR ==================== */}
            <div className="bg-[#005c2e] text-slate-100 text-xs py-1.5 px-4 sm:px-8 border-b border-[#004d26]">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">

                    {/* Left Side: Contact Info */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-5">
                        <a href="tel:+8801714-250145, 01775-483939, 01610-131516" className="flex items-center gap-1 hover:text-[#97D739] transition">
                            <Phone size={13} className="text-[#97D739]" />
                            <span>+880 1714-250145, 01775-483939, 01610-131516</span>
                        </a>

                        <a href="tel: 01610-131516" className="flex items-center gap-1 text-slate-900 font-bold bg-[#97D739] hover:bg-[#85c22f] px-2.5 py-0.5 rounded-full transition shadow-sm text-[11px]">
                            <Ambulance size={13} className="animate-pulse" />
                            <span>{lang === 'bn' ? 'অ্যাম্বুলেন্স: ' : 'Ambulance:  01610-131516'}</span>
                        </a>

                        <div className="hidden md:flex items-center gap-1">
                            <MapPin size={13} className="text-[#97D739]" />
                            <span>{lang === 'bn' ? 'পটুয়াখালী, বাংলাদেশ' : 'Patuakhali, Bangladesh'}</span>
                        </div>

                        <a href="mailto:info@carehospital.com" className="hidden lg:flex items-center gap-1 hover:text-[#97D739] transition">
                            <Mail size={13} className="text-[#97D739]" />
                            <span>prime24ptk@gmail.com</span>
                        </a>
                    </div>

                    {/* Right Side: Language Switcher & Social Links */}
                    <div className="flex items-center gap-3">
                        
                        {/* 🌐 GLOBAL LANGUAGE TOGGLE BUTTON */}
                        <button
                            onClick={handleLanguageToggle}
                            className="flex items-center gap-1 bg-slate-950/40 hover:bg-slate-950 border border-[#97D739]/40 text-[#97D739] px-2.5 py-0.5 rounded-full text-xs font-black transition cursor-pointer shadow-sm"
                            title="Switch Language"
                        >
                            <Globe size={12} />
                            {/* 🟢 Corrected label display: Shows current active language correctly */}
                            <span>{lang === 'bn' ? 'বাংলা' : 'English'}</span>
                        </button>

                        <div className="flex items-center gap-2 border-l border-[#004d26] pl-2.5">
                            <a href="https://www.facebook.com/share/1HtZRK1nXx/" target="_blank" rel="noreferrer" className="hover:text-[#97D739] transition">
                                <FaFacebookF size={20} />
                            </a>
                            
                        </div>
                    </div>
                </div>
            </div>

            {/* ==================== 2. MAIN NAVBAR ==================== */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex justify-between items-center">

                {/* Hospital Logo & Brand Name */}
                <Link to="/" className="flex items-center gap-2.5 group relative z-10 shrink-0">
                    {!logoError ? (
                        <img
                            src="/logo.png"
                            alt="Prime Clinic Logo"
                            onError={() => setLogoError(true)}
                            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                    ) : (
                        <div className="p-2 bg-[#005c2e] text-[#97D739] rounded-xl border border-[#97D739]/30">
                            <Shield size={22} />
                        </div>
                    )}

                    <div className="flex flex-col justify-center select-none">
                        <div className="font-poppins text-lg sm:text-xl font-black tracking-normal leading-none flex items-center gap-1">
                            <span className="text-white uppercase">PRIME</span>
                            <span className="text-[#97D739] uppercase font-black">CLINIC</span>
                        </div>
                        <span className="font-inter text-[9px] font-semibold text-emerald-100 tracking-wider uppercase mt-0.5">
                            {lang === 'bn' ? 'ডায়াগনস্টিক অ্যান্ড কনসালটেশন' : 'Diagnostic & Consultation Center'}
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu Links */}
                <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 font-bold text-white text-xs">
                    <Link to="/" className={`hover:text-[#97D739] transition ${isActive('/') ? 'text-[#97D739]' : ''}`}>
                        {lang === 'bn' ? 'হোম' : 'Home'}
                    </Link>

                    {/* About Dropdown */}
                    <div
                        className="relative group py-1"
                        onMouseEnter={() => setIsAboutHovered(true)}
                        onMouseLeave={() => setIsAboutHovered(false)}
                    >
                        <button
                            className={`flex items-center gap-1 hover:text-[#97D739] transition cursor-pointer ${location.pathname.startsWith('/about') ? 'text-[#97D739]' : ''}`}
                        >
                            <span>{lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About'}</span>
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${isAboutHovered ? 'rotate-180 text-[#97D739]' : ''}`}
                            />
                        </button>

                        {isAboutHovered && (
                            <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <Link
                                    to="/about#who-we-are"
                                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#007A3D] transition"
                                >
                                    <Info size={15} className="text-[#007A3D]" />
                                    <span>{lang === 'bn' ? 'আমরা কারা' : 'Who We Are'}</span>
                                </Link>

                                <Link
                                    to="/about#vision-mission"
                                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#007A3D] transition"
                                >
                                    <Target size={15} className="text-[#007A3D]" />
                                    <span>{lang === 'bn' ? 'লক্ষ্য ও উদ্দেশ্য' : 'Our Vision & Mission'}</span>
                                </Link>

                                <Link
                                    to="/about#our-journey"
                                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#007A3D] transition"
                                >
                                    <History size={15} className="text-[#007A3D]" />
                                    <span>{lang === 'bn' ? 'আমাদের পথচলা' : 'Our Journey'}</span>
                                </Link>

                                <Link
                                    to="/about#executive-committee"
                                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#007A3D] transition"
                                >
                                    <Users size={15} className="text-[#007A3D]" />
                                    <span>{lang === 'bn' ? 'কার্যনির্বাহী কমিটি' : 'Executive Committee'}</span>
                                </Link>

                                <Link
                                    to="/about#core-values"
                                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#007A3D] transition"
                                >
                                    <HeartHandshake size={15} className="text-[#007A3D]" />
                                    <span>{lang === 'bn' ? 'মূল মূল্যবোধ' : 'Our Core Values'}</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Department Dropdown */}
                    <div
                        className="relative group py-1"
                        onMouseEnter={() => setIsDeptHovered(true)}
                        onMouseLeave={() => setIsDeptHovered(false)}
                    >
                        <Link
                            to="/department"
                            className={`flex items-center gap-1 hover:text-[#97D739] transition cursor-pointer ${location.pathname.startsWith('/department') ? 'text-[#97D739]' : ''}`}
                        >
                            <span>{lang === 'bn' ? 'বিভাগসমূহ' : 'Department'}</span>
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${isDeptHovered ? 'rotate-180 text-[#97D739]' : ''}`}
                            />
                        </Link>

                        {isDeptHovered && (
                            <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                {DEPARTMENTS_LIST.map((dept) => {
                                    const IconComponent = dept.icon;
                                    return (
                                        <Link
                                            key={dept.hash}
                                            to={`/department#${dept.hash}`}
                                            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#007A3D] transition"
                                        >
                                            <IconComponent size={15} className="text-[#007A3D]" />
                                            <span>{lang === 'bn' ? dept.nameBn : dept.nameEn}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <Link to="/doctors" className={`hover:text-[#97D739] transition ${isActive('/doctors') ? 'text-[#97D739]' : ''}`}>
                        {lang === 'bn' ? 'ডাক্তারগণ' : 'Doctors'}
                    </Link>
                    <Link to="/reports" className={`hover:text-[#97D739] transition ${isActive('/reports') ? 'text-[#97D739]' : ''}`}>
                        {lang === 'bn' ? 'টেস্ট ও অন-লাইন রিপোর্ট' : 'Test & Online Report'}
                    </Link>
                    <Link to="/contact" className={`hover:text-[#97D739] transition ${isActive('/contact') ? 'text-[#97D739]' : ''}`}>
                        {lang === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
                    </Link>
                </nav>

                {/* CTA Button */}
                <div className="hidden lg:block shrink-0">
                    <Link
                        to="/appointment"
                        className="flex items-center gap-1.5 bg-[#97D739] hover:bg-[#85c22f] text-slate-900 px-4 py-2 rounded-xl text-xs font-black shadow-md transition"
                    >
                        <Calendar size={15} />
                        <span>{lang === 'bn' ? 'সিরিয়াল বুক করুন' : 'Book Appointment'}</span>
                    </Link>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="lg:hidden text-white focus:outline-none p-1"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

            </div>

            {/* ==================== 3. MOBILE DROPDOWN MENU ==================== */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-[#005c2e] border-t border-[#004d26] px-5 py-3 space-y-2 text-xs font-bold text-white shadow-xl">
                    <Link
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#97D739]"
                    >
                        {lang === 'bn' ? 'হোম' : 'Home'}
                    </Link>

                    {/* Mobile Accordion for About */}
                    <div className="py-1">
                        <button
                            onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                            className="flex items-center justify-between w-full py-1 hover:text-[#97D739]"
                        >
                            <span>{lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About'}</span>
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${isMobileAboutOpen ? 'rotate-180 text-[#97D739]' : ''}`}
                            />
                        </button>

                        {isMobileAboutOpen && (
                            <div className="pl-3 space-y-1.5 border-l-2 border-[#97D739]/50 my-1 text-emerald-100">
                                <Link
                                    to="/about#who-we-are"
                                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                                    className="block py-1 hover:text-[#97D739]"
                                >
                                    {lang === 'bn' ? 'আমরা কারা' : 'Who We Are'}
                                </Link>
                                <Link
                                    to="/about#vision-mission"
                                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                                    className="block py-1 hover:text-[#97D739]"
                                >
                                    {lang === 'bn' ? 'লক্ষ্য ও উদ্দেশ্য' : 'Our Vision & Mission'}
                                </Link>
                                <Link
                                    to="/about#our-journey"
                                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                                    className="block py-1 hover:text-[#97D739]"
                                >
                                    {lang === 'bn' ? 'আমাদের পথচলা' : 'Our Journey'}
                                </Link>
                                <Link
                                    to="/about#executive-committee"
                                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                                    className="block py-1 hover:text-[#97D739]"
                                >
                                    {lang === 'bn' ? 'কার্যনির্বাহী কমিটি' : 'Executive Committee'}
                                </Link>
                                <Link
                                    to="/about#core-values"
                                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                                    className="block py-1 hover:text-[#97D739]"
                                >
                                    {lang === 'bn' ? 'মূল মূল্যবোধ' : 'Our Core Values'}
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Accordion for Department */}
                    <div className="py-1">
                        <button
                            onClick={() => setIsMobileDeptOpen(!isMobileDeptOpen)}
                            className="flex items-center justify-between w-full py-1 hover:text-[#97D739]"
                        >
                            <span>{lang === 'bn' ? 'বিভাগসমূহ' : 'Department'}</span>
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${isMobileDeptOpen ? 'rotate-180 text-[#97D739]' : ''}`}
                            />
                        </button>

                        {isMobileDeptOpen && (
                            <div className="pl-3 space-y-1.5 border-l-2 border-[#97D739]/50 my-1 text-emerald-100">
                                <Link
                                    to="/department"
                                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileDeptOpen(false); }}
                                    className="block py-1 font-bold text-white hover:text-[#97D739]"
                                >
                                    {lang === 'bn' ? 'সকল বিভাগ' : 'All Departments'}
                                </Link>
                                {DEPARTMENTS_LIST.map((dept) => (
                                    <Link
                                        key={dept.hash}
                                        to={`/department#${dept.hash}`}
                                        onClick={() => { setIsMobileMenuOpen(false); setIsMobileDeptOpen(false); }}
                                        className="block py-1 hover:text-[#97D739]"
                                    >
                                        {lang === 'bn' ? dept.nameBn : dept.nameEn}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link
                        to="/doctors"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#97D739]"
                    >
                        {lang === 'bn' ? 'ডাক্তারগণ' : 'Doctors'}
                    </Link>
                    <Link
                        to="/reports"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#97D739]"
                    >
                        {lang === 'bn' ? 'টেস্ট ও অন-লাইন রিপোর্ট' : 'Test & Online Report'}
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#97D739]"
                    >
                        {lang === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
                    </Link>
                    <Link
                        to="/appointment"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-center bg-[#97D739] text-slate-900 py-2.5 rounded-xl font-black mt-2 shadow-md"
                    >
                        {lang === 'bn' ? 'সিরিয়াল বুক করুন' : 'Book Appointment'}
                    </Link>
                </div>
            )}

        </header>
    );
}