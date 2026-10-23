import React, { useState, useEffect } from 'react';
import { testConnection } from './firebase';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SmileComparison } from './components/SmileComparison';
import { ServicesSection } from './components/ServicesSection';
import { SpecialistsSection } from './components/SpecialistsSection';
import { BookingForm } from './components/BookingForm';
import { DoctorAdminPanel } from './components/DoctorAdminPanel';
import { Footer } from './components/Footer';
import { PhoneCall, Calendar, Stethoscope, ChevronUp } from 'lucide-react';

export default function App() {
  // Dark mode state: default to dark or saved preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('odontosistemas_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Selected service for the booking form
  const [selectedService, setSelectedService] = useState('Ortodoncia Digital y Alineadores');
  // Phone booking modal state
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  // Show scroll-to-top button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync dark class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('odontosistemas_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('odontosistemas_theme', 'light');
    }
  }, [darkMode]);

  // Test Firestore connection on app boot
  useEffect(() => {
    testConnection();

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectServiceForBooking = (serviceName: string) => {
    setSelectedService(serviceName);
    const agendarElem = document.getElementById('agendar');
    if (agendarElem) {
      agendarElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToBooking = () => {
    const agendarElem = document.getElementById('agendar');
    if (agendarElem) {
      agendarElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToDoctor = () => {
    const panelElem = document.getElementById('panel-doctor');
    if (panelElem) {
      panelElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-cyan-500 selection:text-white transition-colors duration-200">
      
      {/* Main Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenPhoneBooking={() => setPhoneModalOpen(true)}
        onNavigateToBooking={handleNavigateToBooking}
        onNavigateToDoctor={handleNavigateToDoctor}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onNavigateToBooking={handleNavigateToBooking}
          onOpenPhoneBooking={() => setPhoneModalOpen(true)}
        />

        {/* Visual Interactive Before & After Smile Comparison */}
        <SmileComparison
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* Services Showcase (Ortodoncia, Implantes, Estética Dental, etc.) */}
        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* Specialists Team */}
        <SpecialistsSection
          onScheduleWithDoctor={(doctorName) => {
            setSelectedService(`Consulta con ${doctorName}`);
            handleNavigateToBooking();
          }}
        />

        {/* Interactive Booking Form with Google Firestore Real-Time Storage */}
        <BookingForm
          selectedService={selectedService}
          onServiceChange={setSelectedService}
          phoneModalOpen={phoneModalOpen}
          setPhoneModalOpen={setPhoneModalOpen}
        />

        {/* Doctor Administration Panel with Real-Time Table & Status Controls */}
        <DoctorAdminPanel />
      </main>

      {/* Footer with Hours, Location & Direct Doctor Link */}
      <Footer onNavigateToDoctor={handleNavigateToDoctor} />

      {/* Floating Action Button for Emergency / Quick Call & Scroll to top */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all transform hover:-translate-y-1"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setPhoneModalOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-xs shadow-xl shadow-teal-500/30 hover:shadow-teal-500/40 hover:scale-105 active:scale-95 transition-all"
          title="Llamada inmediata a recepción"
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
          <span className="hidden sm:inline">Llamada Rápida Recepción</span>
        </button>
      </div>

    </div>
  );
}
