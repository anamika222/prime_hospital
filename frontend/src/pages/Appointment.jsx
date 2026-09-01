import React, { useState } from 'react';
import { 
    Calendar, 
    Clock, 
    User, 
    Phone, 
    MapPin, 
    CheckCircle2, 
    ArrowRight, 
    ArrowLeft,
    Stethoscope,
    TestTube,
    Home,
    Building2,
    Sparkles,
    ShieldCheck,
    Check
} from 'lucide-react';

const DOCTORS_AND_TESTS = [
    { id: 'd1', name: 'Prof. Dr. S. M. Rahman', spec: 'Chief Pathologist', fee: '৳ ১,০০০', type: 'doctor', exp: '15+ Yrs Exp.' },
    { id: 'd2', name: 'Dr. Nusrat Jahan', spec: 'Senior Microbiologist', fee: '৳ ৮০০', type: 'doctor', exp: '10+ Yrs Exp.' },
    { id: 't1', name: 'Complete Blood Count (CBC)', spec: 'Routine Blood Test', fee: '৳ ৪৫০', type: 'test', exp: 'Fast Report' },
    { id: 't2', name: 'Executive Full Body Screening', spec: 'Comprehensive Package', fee: '৳ ৫,৫০০', type: 'test', exp: 'Best Value' }
];

const TIME_SLOTS = ['09:00 AM', '11:30 AM', '03:00 PM', '06:00 PM', '08:30 PM'];

export default function Appointment() {
    const [step, setStep] = useState(1);
    
    // Form States
    const [selectedService, setSelectedService] = useState(DOCTORS_AND_TESTS[0]);
    const [appointmentMode, setAppointmentMode] = useState('lab');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
    
    // Patient Info
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [patientAddress, setPatientAddress] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        setIsConfirmed(true);
    };

    const handleReset = () => {
        setStep(1);
        setIsConfirmed(false);
        setPatientName('');
        setPatientPhone('');
        setPatientAddress('');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#97D739] selection:text-[#00381b] relative overflow-hidden">
            
            {/* BACKGROUND GLOW EFFECTS */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#007A3D]/20 blur-[140px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#97D739]/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                
                {/* HEADER SECTION */}
                <div className="text-center space-y-3 mb-10">
                    <div className="inline-flex items-center gap-2 bg-[#97D739]/10 border border-[#97D739]/30 text-[#97D739] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full backdrop-blur-md">
                        <Sparkles size={14} /> Prime Clinic Online Booking
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#97D739] to-emerald-400">Appointment</span>
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                        Fast, reliable, and seamless healthcare service scheduling in just 3 easy steps.
                    </p>
                </div>

                {/* MAIN CARD CONTAINER */}
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                    
                    {!isConfirmed ? (
                        <>
                            {/* PROGRESS BAR & STEPS INDICATOR */}
                            <div className="mb-8 space-y-4">
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
                                    <span className={step >= 1 ? 'text-[#97D739]' : ''}>1. Choose Service</span>
                                    <span className={step >= 2 ? 'text-[#97D739]' : ''}>2. Date & Time</span>
                                    <span className={step >= 3 ? 'text-[#97D739]' : ''}>3. Patient Info</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-gradient-to-r from-[#007A3D] to-[#97D739] h-full transition-all duration-500 ease-out"
                                        style={{ width: `${(step / 3) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* STEP 1: SERVICE SELECTION */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Select Doctor or Diagnostic Test</h3>
                                        <p className="text-xs text-slate-400">Choose from our top pathology specialists or health packages</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {DOCTORS_AND_TESTS.map(item => {
                                            const isSelected = selectedService.id === item.id;
                                            return (
                                                <div 
                                                    key={item.id}
                                                    onClick={() => setSelectedService(item)}
                                                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative group ${
                                                        isSelected 
                                                            ? 'bg-gradient-to-b from-[#007A3D]/30 to-slate-900 border-[#97D739] shadow-xl shadow-[#007A3D]/10' 
                                                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between gap-3 mb-3">
                                                        <div className={`p-3 rounded-xl ${item.type === 'doctor' ? 'bg-amber-500/10 text-amber-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                                                            {item.type === 'doctor' ? <Stethoscope size={22} /> : <TestTube size={22} />}
                                                        </div>
                                                        {isSelected && (
                                                            <span className="w-6 h-6 rounded-full bg-[#97D739] text-[#00381b] flex items-center justify-center">
                                                                <Check size={14} strokeWidth={3} />
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                                                            {item.exp}
                                                        </span>
                                                        <h4 className="text-sm font-bold text-white mt-2 group-hover:text-[#97D739] transition">{item.name}</h4>
                                                        <p className="text-xs text-slate-400 mt-0.5">{item.spec}</p>
                                                    </div>

                                                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                                                        <span className="text-xs text-slate-500 font-medium">Total Fee</span>
                                                        <span className="text-base font-black text-[#97D739]">{item.fee}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <button 
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="w-full bg-[#97D739] hover:bg-white text-[#00381b] py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-6 shadow-lg shadow-[#97D739]/10 transition-all cursor-pointer"
                                    >
                                        <span>Continue to Schedule</span>
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            )}

                            {/* STEP 2: DATE, TIME & MODE */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Schedule Visit Details</h3>
                                        <p className="text-xs text-slate-400">Pick how and when you would like to receive the service</p>
                                    </div>

                                    {/* APPOINTMENT MODE */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-400">Appointment Type</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setAppointmentMode('lab')}
                                                className={`p-4 rounded-2xl border font-bold text-xs flex items-center gap-3 transition cursor-pointer ${
                                                    appointmentMode === 'lab' 
                                                        ? 'bg-[#007A3D] text-white border-[#97D739] shadow-lg' 
                                                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                                                }`}
                                            >
                                                <Building2 size={20} className={appointmentMode === 'lab' ? 'text-[#97D739]' : ''} />
                                                <div className="text-left">
                                                    <div className="text-sm font-bold">Clinic Visit</div>
                                                    <div className="text-[10px] opacity-70 font-normal">Visit our branch</div>
                                                </div>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setAppointmentMode('home')}
                                                className={`p-4 rounded-2xl border font-bold text-xs flex items-center gap-3 transition cursor-pointer ${
                                                    appointmentMode === 'home' 
                                                        ? 'bg-[#007A3D] text-white border-[#97D739] shadow-lg' 
                                                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                                                }`}
                                            >
                                                <Home size={20} className={appointmentMode === 'home' ? 'text-[#97D739]' : ''} />
                                                <div className="text-left">
                                                    <div className="text-sm font-bold">Home Collection</div>
                                                    <div className="text-[10px] opacity-70 font-normal">Sample collection at home</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* DATE SELECTION */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-400">Select Date</label>
                                        <div className="relative">
                                            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                            <input 
                                                type="date"
                                                required
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-12 pr-4 py-3.5 text-xs font-bold focus:outline-none focus:border-[#97D739] transition"
                                            />
                                        </div>
                                    </div>

                                    {/* TIME SLOTS */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-400">Available Time Slots</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                                            {TIME_SLOTS.map(time => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`py-3 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                                                        selectedTime === time 
                                                            ? 'bg-[#97D739] text-[#00381b] border-[#97D739] shadow-md' 
                                                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                                                    }`}
                                                >
                                                    <Clock size={14} />
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button 
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 py-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                                        >
                                            <ArrowLeft size={16} /> Back
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                if(!selectedDate) return alert('Please select a preferred date.');
                                                setStep(3);
                                            }}
                                            className="w-2/3 bg-[#97D739] hover:bg-white text-[#00381b] py-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                                        >
                                            Enter Patient Info <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: PATIENT INFORMATION */}
                            {step === 3 && (
                                <form onSubmit={handleBookingSubmit} className="space-y-5">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Patient Details</h3>
                                        <p className="text-xs text-slate-400">Provide contact information for confirmation SMS & updates</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Full Name</label>
                                            <div className="relative">
                                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                                <input 
                                                    type="text" 
                                                    required
                                                    placeholder="e.g. Md. Tanvir Hossain"
                                                    value={patientName}
                                                    onChange={(e) => setPatientName(e.target.value)}
                                                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-12 pr-4 py-3.5 text-xs font-bold focus:outline-none focus:border-[#97D739] transition"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Phone Number</label>
                                            <div className="relative">
                                                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                                <input 
                                                    type="tel" 
                                                    required
                                                    placeholder="01700000000"
                                                    value={patientPhone}
                                                    onChange={(e) => setPatientPhone(e.target.value)}
                                                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-12 pr-4 py-3.5 text-xs font-bold focus:outline-none focus:border-[#97D739] transition"
                                                />
                                            </div>
                                        </div>

                                        {appointmentMode === 'home' && (
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Full Address (Home Collection)</label>
                                                <div className="relative">
                                                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                                    <input 
                                                        type="text" 
                                                        required
                                                        placeholder="House, Road, Area, City"
                                                        value={patientAddress}
                                                        onChange={(e) => setPatientAddress(e.target.value)}
                                                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-12 pr-4 py-3.5 text-xs font-bold focus:outline-none focus:border-[#97D739] transition"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* BOOKING SUMMARY BOX */}
                                    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2.5 text-xs">
                                        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                                            <span className="text-slate-400">Selected Service</span>
                                            <span className="font-bold text-white">{selectedService.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400">Schedule</span>
                                            <span className="font-bold text-[#97D739]">{selectedDate} ({selectedTime})</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                                            <span className="text-slate-400">Total Payment</span>
                                            <span className="font-extrabold text-base text-[#97D739]">{selectedService.fee}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <button 
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 py-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                                        >
                                            <ArrowLeft size={16} /> Back
                                        </button>
                                        <button 
                                            type="submit"
                                            className="w-2/3 bg-[#97D739] hover:bg-white text-[#00381b] py-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#97D739]/10 transition cursor-pointer"
                                        >
                                            <ShieldCheck size={18} /> Confirm Appointment
                                        </button>
                                    </div>
                                </form>
                            )}
                        </>
                    ) : (
                        /* SUCCESSFUL CONFIRMATION CARD */
                        <div className="text-center py-10 space-y-6">
                            <div className="w-20 h-20 bg-gradient-to-tr from-[#007A3D] to-[#97D739] text-[#00381b] rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-[#007A3D]/40">
                                <CheckCircle2 size={48} strokeWidth={2.5} />
                            </div>

                            <div>
                                <h3 className="text-3xl font-extrabold text-white">Booking Confirmed!</h3>
                                <p className="text-xs sm:text-sm text-slate-400 mt-1">We have sent a confirmation message to your phone.</p>
                            </div>

                            <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl text-xs sm:text-sm space-y-3 text-left max-w-md mx-auto">
                                <div className="flex justify-between"><span className="text-slate-400">Patient:</span> <strong className="text-white font-bold">{patientName}</strong></div>
                                <div className="flex justify-between"><span className="text-slate-400">Contact:</span> <strong className="text-white font-bold">{patientPhone}</strong></div>
                                <div className="flex justify-between"><span className="text-slate-400">Service:</span> <strong className="text-white font-bold">{selectedService.name}</strong></div>
                                <div className="flex justify-between"><span className="text-slate-400">Date & Slot:</span> <strong className="text-[#97D739] font-bold">{selectedDate} ({selectedTime})</strong></div>
                                <div className="flex justify-between"><span className="text-slate-400">Visit Mode:</span> <strong className="text-white font-bold">{appointmentMode === 'home' ? 'Home Collection' : 'Clinic Visit'}</strong></div>
                            </div>

                            <button 
                                type="button"
                                onClick={handleReset}
                                className="bg-[#007A3D] hover:bg-[#005e2e] text-white px-8 py-3.5 rounded-xl font-bold text-xs shadow-lg transition cursor-pointer mt-2"
                            >
                                Book Another Appointment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}