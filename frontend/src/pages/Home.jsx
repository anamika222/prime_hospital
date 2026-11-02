import React from 'react';
import Navbar from '../components/Navbar'; // আপনার Navbar Component Path
import Hero from '../components/Hero';     // আপনার Hero/HeroSlider Component Path
import AboutPreview from '../components/Aboutpreview';
import Department from './Department';
import DoctorsPage from './Doctors';
import Report from './Report';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* 1. TOP NAVIGATION & HERO SLIDER */}
            <Navbar />
            <Hero />

            {/* 2. MAIN CONTENT SECTIONS */}
            <main className="max-w-7xl mx-auto px-4 py-8 space-y-16">
                {/* About Section */}
                <AboutPreview />

                {/* Clinical Departments Section */}
                <section>
                    <Department />
                </section>

                {/* Doctors Directory Section */}
                <section>
                    <DoctorsPage />
                </section>

                {/* Diagnostic Tests & Patient Report Download Section */}
                <section>
                    <Report />
                </section>
            </main>
        </div>
    );
}