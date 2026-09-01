import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero'; 
import About from './pages/About';
import Department from './pages/Department';
import Services from './pages/Services';
import Report from './pages/Report';
import Appointment from './pages/Appointment';

const Home = () => <Hero />;
const Contact = () => <div className="p-8 text-center text-2xl">Contact Us Page</div>;


export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* 🔻 /about এবং /about/... সব পাথের জন্যই About পেজ রেন্ডার হবে */}
        <Route path="/about" element={<About />} />
        

        <Route path="/department" element={<Department />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </Router>
  );
}