import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero'; 
import AboutPreview from './components/Aboutpreview';
import Footer from './components/Footer'; // 🟢 Syntax error ঠিক করা হয়েছে

// Page Imports
import About from './pages/About';
import Department from './pages/Department';
import Services from './pages/Services';
import Report from './pages/Report';
import Appointment from './pages/Appointment';
import Doctors from './pages/Doctors';

// 🟢 Home Component
const Home = () => (
  <div className="min-h-screen bg-slate-950 text-white">
    {/* 1. Hero Slider Banner */}
    <Hero />

    {/* 2. Main Page Sections */}
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      <AboutPreview />
      <section><Department /></section>
      <section><Doctors /></section>
      <section><Report /></section>
    </main>
  </div>
);

const Contact = () => <div className="p-8 text-center text-2xl text-white">Contact Us Page</div>;

export default function App() {
  return (
    <Router>
      {/* 🟢 ১. উপরে সবসময় গ্লোবাল নভবাক্স থাকবে */}
      <Navbar />

      {/* 🟢 ২. পেজ অনুযায়ী ভিতরের কনটেন্ট পরিবর্তন হবে */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/department" element={<Department />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />
        
        {/* Fallback 404 Route */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* 🟢 ৩. নিচে সবসময় গ্লোবাল ফুটার থাকবে (সব পেজে দেখাবে) */}
      <Footer />
    </Router>
  );
}