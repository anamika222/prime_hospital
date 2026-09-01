import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Appointment from '../pages/Appointment';
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
    Wind
} from 'lucide-react';

import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaYoutube
} from 'react-icons/fa';

// ডিপার্টমেন্টের লিস্ট
const DEPARTMENTS_LIST = [
    { name: 'Orthopedics', hash: 'orthopedics', icon: Activity },
    { name: 'Surgery', hash: 'surgery', icon: Stethoscope },
    { name: 'Gynecology', hash: 'gynecology', icon: HeartPulse },
    { name: 'Cardiology', hash: 'cardiology', icon: HeartPulse },
    { name: 'Internal Medicine', hash: 'internal-medicine', icon: Stethoscope },
    { name: 'Neurosurgery', hash: 'neurosurgery', icon: Brain },
    { name: 'Pulmonology', hash: 'pulmonology', icon: Wind }
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // About state
    const [isAboutHovered, setIsAboutHovered] = useState(false);
    const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

    // Department state
    const [isDeptHovered, setIsDeptHovered] = useState(false);
    const [isMobileDeptOpen, setIsMobileDeptOpen] = useState(false);

    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="w-full shadow-md sticky top-0 z-50 bg-[#007A3D]">

            {/* ==================== 1. TOP BAR ==================== */}
            <div className="bg-[#005c2e] text-slate-100 text-xs sm:text-sm py-2 px-4 sm:px-8 border-b border-[#004d26]">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-2">

                    {/* Left Side: Contact Info */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
                        <a href="tel:+8801700000000" className="flex items-center gap-1.5 hover:text-[#97D739] transition">
                            <Phone size={14} className="text-[#97D739]" />
                            <span>+880 1700-000000</span>
                        </a>

                        <a href="tel:10616" className="flex items-center gap-1.5 text-slate-900 font-bold bg-[#97D739] hover:bg-[#85c22f] px-3 py-0.5 rounded-full transition shadow-sm">
                            <Ambulance size={15} className="animate-pulse" />
                            <span>Ambulance: 10616</span>
                        </a>

                        <div className="hidden md:flex items-center gap-1.5">
                            <MapPin size={14} className="text-[#97D739]" />
                            <span>Dhaka, Bangladesh</span>
                        </div>

                        <a href="mailto:info@carehospital.com" className="hidden sm:flex items-center gap-1.5 hover:text-[#97D739] transition">
                            <Mail size={14} className="text-[#97D739]" />
                            <span>info@carehospital.com</span>
                        </a>
                    </div>

                    {/* Right Side: Social Media Links */}
                    <div className="flex items-center gap-3">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#97D739] transition">
                            <FaFacebookF size={14} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#97D739] transition">
                            <FaTwitter size={14} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#97D739] transition">
                            <FaLinkedinIn size={14} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#97D739] transition">
                            <FaInstagram size={14} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#97D739] transition">
                            <FaYoutube size={14} />
                        </a>
                    </div>
                </div>
            </div>

            {/* ==================== 2. MAIN NAVBAR ==================== */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">

                {/* Hospital Logo & Brand Name */}
                <Link to="/" className="flex items-center gap-3 group relative z-10">
                    <img
                        src="/logo.png"
                        alt="Prime Clinic Logo"
                        className="h-20 sm:h-24 lg:h-28 w-auto object-contain -my-4 sm:-my-6 transition-transform group-hover:scale-105 drop-shadow-md"
                    />
                    <div className="flex flex-col justify-center select-none pl-1">
                        <div className="font-poppins text-2xl sm:text-3xl font-black tracking-normal leading-none flex items-center gap-1">
                            <span className="text-white uppercase">PRIME</span>
                            <span className="text-[#97D739] uppercase font-black">CLINIC</span>
                        </div>
                        <span className="font-inter text-[9px] sm:text-[10px] font-semibold text-emerald-100 tracking-[0.18em] uppercase mt-1">
                            Diagnostic & Consultation Center
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu Links */}
                <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-semibold text-white text-sm">
                    <Link to="/" className={`hover:text-[#97D739] transition ${isActive('/') ? 'text-[#97D739] font-bold' : ''}`}>
                        Home
                    </Link>

                    {/* About Dropdown for Desktop */}
                    <div
                        className="relative group py-2"
                        onMouseEnter={() => setIsAboutHovered(true)}
                        onMouseLeave={() => setIsAboutHovered(false)}
                    >
                        <button
                            className={`flex items-center gap-1 hover:text-[#97D739] transition cursor-pointer ${location.pathname.startsWith('/about') ? 'text-[#97D739] font-bold' : ''}`}
                        >
                            <span>About</span>
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${isAboutHovered ? 'rotate-180 text-[#97D739]' : ''}`}
                            />
                        </button>

                        {isAboutHovered && (
                            <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <Link
                                    to="/about#who-we-are"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-[#007A3D] transition"
                                >
                                    <div className="p-1.5 bg-emerald-100 text-[#007A3D] rounded-lg">
                                        <Info size={16} />
                                    </div>
                                    <span>Who We Are</span>
                                </Link>

                                <Link
                                    to="/about#vision-mission"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-[#007A3D] transition"
                                >
                                    <div className="p-1.5 bg-emerald-100 text-[#007A3D] rounded-lg">
                                        <Target size={16} />
                                    </div>
                                    <span>Our Vision & Mission</span>
                                </Link>

                                <Link
                                    to="/about#our-journey"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-[#007A3D] transition"
                                >
                                    <div className="p-1.5 bg-emerald-100 text-[#007A3D] rounded-lg">
                                        <History size={16} />
                                    </div>
                                    <span>Our Journey</span>
                                </Link>

                                <Link
                                    to="/about#executive-committee"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-[#007A3D] transition"
                                >
                                    <div className="p-1.5 bg-emerald-100 text-[#007A3D] rounded-lg">
                                        <Users size={16} />
                                    </div>
                                    <span>Executive Committee</span>
                                </Link>

                                <Link
                                    to="/about#core-values"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-[#007A3D] transition"
                                >
                                    <div className="p-1.5 bg-emerald-100 text-[#007A3D] rounded-lg">
                                        <HeartHandshake size={16} />
                                    </div>
                                    <span>Our Core Values</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Department Dropdown for Desktop */}
                    <div
                        className="relative group py-2"
                        onMouseEnter={() => setIsDeptHovered(true)}
                        onMouseLeave={() => setIsDeptHovered(false)}
                    >
                        <Link
                            to="/department"
                            className={`flex items-center gap-1 hover:text-[#97D739] transition cursor-pointer ${location.pathname.startsWith('/department') ? 'text-[#97D739] font-bold' : ''}`}
                        >
                            <span>Department</span>
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${isDeptHovered ? 'rotate-180 text-[#97D739]' : ''}`}
                            />
                        </Link>

                        {isDeptHovered && (
                            <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                {DEPARTMENTS_LIST.map((dept) => {
                                    const IconComponent = dept.icon;
                                    return (
                                        <Link
                                            key={dept.hash}
                                            to={`/department#${dept.hash}`}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-[#007A3D] transition"
                                        >
                                            <div className="p-1.5 bg-emerald-100 text-[#007A3D] rounded-lg">
                                                <IconComponent size={16} />
                                            </div>
                                            <span>{dept.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <Link to="/services" className={`hover:text-[#97D739] transition ${isActive('/services') ? 'text-[#97D739] font-bold' : ''}`}>
                        Services
                    </Link>
                    <Link to="/reports" className={`hover:text-[#97D739] transition ${isActive('/reports') ? 'text-[#97D739] font-bold' : ''}`}>
                        Test & Online Report
                    </Link>
                    <Link to="/contact" className={`hover:text-[#97D739] transition ${isActive('/contact') ? 'text-[#97D739] font-bold' : ''}`}>
                        Contact Us
                    </Link>
                </nav>

                {/* CTA Button */}
                <div className="hidden lg:block">
                    <Link
                        to="/appointment"
                        className="flex items-center gap-2 bg-[#97D739] hover:bg-[#85c22f] text-slate-900 px-5 py-2.5 rounded-lg font-bold shadow-md transition"
                    >
                        <Calendar size={18} />
                        <span>Book an Appointment</span>
                    </Link>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="lg:hidden text-white focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

            </div>

            {/* ==================== 3. MOBILE DROPDOWN MENU ==================== */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-[#005c2e] border-t border-[#004d26] px-6 py-4 space-y-3 shadow-xl">
                    <Link
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-white font-semibold hover:text-[#97D739] py-1"
                    >
                        Home
                    </Link>

                    {/* Mobile Accordion for About */}
                    <div className="py-1">
                        <button
                            onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                            className="flex items-center justify-between w-full text-white font-semibold hover:text-[#97D739]"
                        >
                            <span>About</span>
                            <ChevronDown
                                size={18}
                                className={`transition-transform duration-300 ${isMobileAboutOpen ? 'rotate-180 text-[#97D739]' : ''}`}
                            />
                        </button>

                        {isMobileAboutOpen && (
                            <div className="pl-3 mt-2 space-y-2 border-l-2 border-[#97D739]/50">
                                <Link
                                    to="/about#who-we-are"
                                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                                    className="block text-emerald-100 text-sm font-medium hover:text-[#97D739] py-1"
                                >
                                    Who We Are
                                </Link>
                                <Link
                                    to="/about#vision-mission"
                                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                                    className="block text-emerald-100 text-sm font-medium hover:text-[#97D739] py-1"
                                >
                                    Our Vision & Mission
                                </Link>
                                <Link
                                    to="/about#our-journey"
                                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                                    className="block text-emerald-100 text-sm font-medium hover:text-[#97D739] py-1"
                                >
                                    Our Journey
                                </Link>
                                <Link
                                    to="/about#executive-committee"
                                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                                    className="block text-emerald-100 text-sm font-medium hover:text-[#97D739] py-1"
                                >
                                    Executive Committee
                                </Link>
                                <Link
                                    to="/about#core-values"
                                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                                    className="block text-emerald-100 text-sm font-medium hover:text-[#97D739] py-1"
                                >
                                    Our Core Values
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Accordion for Department */}
                    <div className="py-1">
                        <button
                            onClick={() => setIsMobileDeptOpen(!isMobileDeptOpen)}
                            className="flex items-center justify-between w-full text-white font-semibold hover:text-[#97D739]"
                        >
                            <span>Department</span>
                            <ChevronDown
                                size={18}
                                className={`transition-transform duration-300 ${isMobileDeptOpen ? 'rotate-180 text-[#97D739]' : ''}`}
                            />
                        </button>

                        {isMobileDeptOpen && (
                            <div className="pl-3 mt-2 space-y-2 border-l-2 border-[#97D739]/50">
                                <Link
                                    to="/department"
                                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileDeptOpen(false); }}
                                    className="block text-white font-semibold text-sm hover:text-[#97D739] py-1"
                                >
                                    All Departments
                                </Link>
                                {DEPARTMENTS_LIST.map((dept) => (
                                    <Link
                                        key={dept.hash}
                                        to={`/department#${dept.hash}`}
                                        onClick={() => { setIsMobileMenuOpen(false); setIsMobileDeptOpen(false); }}
                                        className="block text-emerald-100 text-sm font-medium hover:text-[#97D739] py-1"
                                    >
                                        {dept.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link
                        to="/services"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-white font-semibold hover:text-[#97D739] py-1"
                    >
                        Services
                    </Link>
                    <Link
                        to="/reports"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-white font-semibold hover:text-[#97D739] py-1"
                    >
                        Test & Online Report
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-white font-semibold hover:text-[#97D739] py-1"
                    >
                        Contact Us
                    </Link>
                    <Link
                        to="/appointment"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-center bg-[#97D739] text-slate-900 py-3 rounded-lg font-bold shadow-md mt-4"
                    >
                        Book an Appointment
                    </Link>
                </div>
            )}

        </header>
    );
}