import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, UserCheck, PhoneCall } from 'lucide-react';

export default function Hero({ slidesFromAdmin = [] }) {
    // ডেমো ডেটা (যদি API থেকে ডেটা না আসে তার জন্য ডিফল্ট স্লাইডার)
    const defaultSlides = [
        {
            id: 1,
            imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80",
            title: "Modern Healthcare Services You Can Trust",
            subtitle: "২৪/৭ বিশেষায়িত ডাক্তার এবং আধুনিক রোগ নির্ণয় সেবা নিয়ে আমরা আছি আপনার পাশে।"
        },
        {
            id: 2,
            imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80",
            title: "Advanced Diagnostic & Care Center",
            subtitle: "নির্ভুল টেস্ট রিপোর্ট এবং অভিজ্ঞ ডাক্তারের পরামর্শ পান একই ছাদের নিচে।"
        }
    ];

    // এডমিন থেকে পাওয়া ডেটা অথবা ডিফল্ট ডেটা সেট করা
    const slides = slidesFromAdmin.length > 0 ? slidesFromAdmin : defaultSlides;
    const [currentSlide, setCurrentSlide] = useState(0);

    // অটো-স্লাইড চালু করা (প্রতি ৫ সেকেন্ড পর পর ব্যাকগ্রাউন্ড চেঞ্জ হবে)
    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    };

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    };

    return (
        <section className="relative w-full bg-slate-900 text-white overflow-hidden">
            {/* Background Image Slider with Dark Overlay */}
            <div className="relative h-[550px] sm:h-[650px] w-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id || index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        {/* Dynamic Background Image */}
                        <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Dark Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                    </div>
                ))}

                {/* Main Content Overlay */}
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pb-20">
                    <div className="max-w-2xl">
                        <span className="inline-block bg-[#97D739] text-slate-900 text-xs sm:text-sm font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                            Welcome to Prime Clinic
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
                            {slides[currentSlide]?.title}
                        </h1>
                        <p className="text-base sm:text-lg text-slate-200 mb-8 leading-relaxed">
                            {slides[currentSlide]?.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/appointment"
                                className="bg-[#97D739] hover:bg-[#85c22f] text-slate-900 font-bold px-6 py-3.5 rounded-lg shadow-lg transition flex items-center gap-2"
                            >
                                <Calendar size={20} />
                                <span>Book Appointment</span>
                            </Link>
                            <Link
                                to="/department"
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold px-6 py-3.5 rounded-lg transition"
                            >
                                Our Departments
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Slider Controls (Left & Right Buttons) */}
                {slides.length > 1 && (
                    <div className="absolute z-30 bottom-24 right-6 sm:right-12 flex items-center gap-2">
                        <button
                            onClick={prevSlide}
                            className="p-3 rounded-full bg-black/40 hover:bg-[#007A3D] text-white transition backdrop-blur-sm"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-3 rounded-full bg-black/40 hover:bg-[#007A3D] text-white transition backdrop-blur-sm"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}
            </div>

            {/* Floating Quick Action Cards (Overlap at bottom) */}
            <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-[#007A3D] p-6 rounded-xl shadow-xl flex items-start gap-4 text-white hover:-translate-y-1 transition duration-300">
                        <div className="p-3 bg-white/10 rounded-lg">
                            <Calendar size={32} className="text-[#97D739]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Online Appointment</h3>
                            <p className="text-xs text-emerald-100 mt-1">সহজেই ঘরে বসে অভিজ্ঞ ডাক্তারদের সময়সূচী দেখে সিরিয়াল দিন।</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-xl flex items-start gap-4 text-slate-800 hover:-translate-y-1 transition duration-300 border border-slate-100">
                        <div className="p-3 bg-emerald-50 rounded-lg">
                            <UserCheck size={32} className="text-[#007A3D]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Find Doctor</h3>
                            <p className="text-xs text-slate-500 mt-1">আপনার প্রয়োজনীয় বিভাগের বিশেষজ্ঞ ডাক্তার নির্বাচন করুন।</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#005c2e] p-6 rounded-xl shadow-xl flex items-start gap-4 text-white hover:-translate-y-1 transition duration-300">
                        <div className="p-3 bg-white/10 rounded-lg">
                            <PhoneCall size={32} className="text-[#97D739]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">24/7 Emergency</h3>
                            <p className="text-xs text-emerald-100 mt-1">জরুরি চিকিৎসায় যেকোনো সময় সরাসরি যোগাযোগ করুন।</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}