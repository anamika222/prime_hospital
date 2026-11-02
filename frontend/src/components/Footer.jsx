import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Phone, Ambulance, MapPin, Mail, Shield, Clock, ArrowRight, Heart
} from 'lucide-react';
import { 
    FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube 
} from 'react-icons/fa';

const STORAGE_KEY = 'site_lang';

export default function Footer() {
    const [logoError, setLogoError] = useState(false);

    // 🟢 1. LocalStorage থেকে Global Language স্টেট রিড করা
    const [lang, setLang] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'bn';
        } catch {
            return 'bn';
        }
    });

    // 🟢 2. Navbar-এর languageChange Event অনুযায়ী লাইভ সিঙ্ক
    useEffect(() => {
        const handleLangChange = () => {
            const currentLang = localStorage.getItem(STORAGE_KEY) || 'bn';
            setLang(currentLang);
        };

        window.addEventListener('languageChange', handleLangChange);
        return () => window.removeEventListener('languageChange', handleLangChange);
    }, []);

    return (
        <footer className="bg-slate-950 text-slate-300 font-sans border-t border-slate-800 relative overflow-hidden">
            
            {/* Top Accent Line */}
            <div className="h-1 w-full bg-gradient-to-r from-[#007A3D] via-[#97D739] to-[#007A3D]" />

            {/* MAIN FOOTER CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    
                    {/* COLUMN 1: Brand Info & Bio (2 Columns Width on LG) */}
                    <div className="lg:col-span-2 space-y-5">
                        <Link to="/" className="flex items-center gap-2.5">
                            {!logoError ? (
                                <img
                                    src="/logo.png"
                                    alt="Prime Clinic Logo"
                                    onError={() => setLogoError(true)}
                                    className="h-10 sm:h-12 w-auto object-contain"
                                />
                            ) : (
                                <div className="p-2 bg-[#005c2e] text-[#97D739] rounded-xl border border-[#97D739]/30">
                                    <Shield size={22} />
                                </div>
                            )}

                            <div className="flex flex-col justify-center select-none">
                                <div className="font-poppins text-xl font-black tracking-normal leading-none flex items-center gap-1">
                                    <span className="text-white uppercase">PRIME</span>
                                    <span className="text-[#97D739] uppercase font-black">CLINIC</span>
                                </div>
                                <span className="font-inter text-[9px] font-semibold text-emerald-400 tracking-wider uppercase mt-1">
                                    {lang === 'bn' ? 'ডায়াগনস্টিক অ্যান্ড কনসালটেশন' : 'Diagnostic & Consultation Center'}
                                </span>
                            </div>
                        </Link>

                        <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-sm">
                            {lang === 'bn' 
                                ? 'প্রাইম ক্লিনিক একটি আধুনিক ও স্বয়ংক্রিয় স্বাস্থ্যসেবা প্রতিষ্ঠান। অভিজ্ঞ ডাক্তার এবং আন্তর্জাতিক মানের প্যাথলজি ল্যাবের মাধ্যমে আমরা নির্ভুল সেবায় প্রতিশ্রুতিবদ্ধ।' 
                                : 'Prime Clinic is a leading diagnostic and consultative facility delivering clinical precision and compassionate patient care through state-of-the-art medical technology.'}
                        </p>

                        {/* Emergency Ambulance Card */}
                        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3.5 w-fit">
                            <div className="p-2.5 bg-[#007A3D] text-[#97D739] rounded-xl shadow-inner">
                                <Ambulance size={20} className="animate-pulse" />
                            </div>
                            <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                                    {lang === 'bn' ? '২৪/৭ জরুরি অ্যাম্বুলেন্স' : '24/7 Emergency Ambulance'}
                                </span>
                                <a href="tel:10616" className="text-sm font-black text-[#97D739] hover:underline">
                                    10616 / +880 1700-000000
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 2: Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-black uppercase text-white tracking-wider border-b border-slate-800 pb-2">
                            {lang === 'bn' ? 'দ্রুত লিঙ্ক' : 'Quick Links'}
                        </h4>
                        <ul className="space-y-2.5 text-xs font-semibold">
                            <li>
                                <Link to="/" className="hover:text-[#97D739] transition flex items-center gap-1.5">
                                    <ArrowRight size={12} className="text-[#007A3D]" />
                                    <span>{lang === 'bn' ? 'হোম পেজ' : 'Home'}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-[#97D739] transition flex items-center gap-1.5">
                                    <ArrowRight size={12} className="text-[#007A3D]" />
                                    <span>{lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/doctors" className="hover:text-[#97D739] transition flex items-center gap-1.5">
                                    <ArrowRight size={12} className="text-[#007A3D]" />
                                    <span>{lang === 'bn' ? 'বিশেষজ্ঞ ডাক্তারগণ' : 'Specialist Doctors'}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/department" className="hover:text-[#97D739] transition flex items-center gap-1.5">
                                    <ArrowRight size={12} className="text-[#007A3D]" />
                                    <span>{lang === 'bn' ? 'মেডিকেল বিভাগসমূহ' : 'Medical Departments'}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/reports" className="hover:text-[#97D739] transition flex items-center gap-1.5">
                                    <ArrowRight size={12} className="text-[#007A3D]" />
                                    <span>{lang === 'bn' ? 'অনলাইন রিপোর্ট ডাউনলোড' : 'Online Report Download'}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* COLUMN 3: Medical Services */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-black uppercase text-white tracking-wider border-b border-slate-800 pb-2">
                            {lang === 'bn' ? 'আমাদের সেবাসমূহ' : 'Our Services'}
                        </h4>
                        <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
                            <li>{lang === 'bn' ? 'ডিজিটাল প্যাথলজি ও বায়োকেমিস্ট্রি' : 'Digital Pathology & Biochemistry'}</li>
                            <li>{lang === 'bn' ? '১.৫টি এমআরআই ও সিটি স্ক্যান' : '1.5T MRI & 128-Slice CT Scan'}</li>
                            <li>{lang === 'bn' ? '৪ডি কালার ডপলার আল্ট্রাসনোগ্রাম' : '4D Color Doppler USG'}</li>
                            <li>{lang === 'bn' ? 'ডিজিটাল এক্স-রে ও ইসিজি' : 'Digital X-Ray & ECG'}</li>
                            <li>{lang === 'bn' ? 'হরমোন ও ক্যানসার মার্কার টেস্ট' : 'Hormone & Cancer Marker Panels'}</li>
                        </ul>
                    </div>

                    {/* COLUMN 4: Contact & Hours */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-black uppercase text-white tracking-wider border-b border-slate-800 pb-2">
                            {lang === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
                        </h4>
                        <div className="space-y-3 text-xs font-medium">
                            <div className="flex items-start gap-2.5">
                                <MapPin size={15} className="text-[#97D739] shrink-0 mt-0.5" />
                                <span>{lang === 'bn' ? 'প্রধান সড়ক, পটুয়াখালী সদর, পটুয়াখালী' : 'Main Road, Patuakhali Sadar, Patuakhali'}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone size={15} className="text-[#97D739] shrink-0" />
                                <a href="tel:01714-250145, 01775-483939, 01610-131516" className="hover:text-white transition">+880 1714-250145, 01775-483939, 01610-131516</a>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail size={15} className="text-[#97D739] shrink-0" />
                                <a href="mailto:info@carehospital.com" className="hover:text-white transition">info@carehospital.com</a>
                            </div>
                            <div className="flex items-center gap-2.5 pt-1 text-slate-400">
                                <Clock size={15} className="text-[#97D739] shrink-0" />
                                <span>{lang === 'bn' ? 'খোলা: প্রতিদিন (২৪ ঘণ্টা)' : 'Open 24/7 Everyday'}</span>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2 pt-2">
                            <a href="https://www.facebook.com/share/1HtZRK1nXx/" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 border border-slate-800 hover:border-[#97D739] hover:text-[#97D739] rounded-xl transition">
                                <FaFacebookF size={20} />
                            </a>
                           
                        </div>
                    </div>

                </div>

                {/* BOTTOM COPYRIGHT SECTION */}
                <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
                    <p>© {new Date().getFullYear()} PRIME CLINIC. {lang === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}</p>
                    <p className="flex items-center gap-1">
                        <span>{lang === 'bn' ? 'ডিজাইন ও ডেভেলপমেন্টে' : 'Developed with'}</span>
                        <Heart size={12} className="text-red-500 fill-red-500 inline" />
                        <span>{lang === 'bn' ? 'প্রাইম ক্লিনিক আইটি টিম' : 'Prime Clinic IT Team'}</span>
                    </p>
                </div>
            </div>

        </footer>
    );
}