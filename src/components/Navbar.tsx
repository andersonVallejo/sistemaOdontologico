import React from 'react';
import { Sparkles, Phone, ShieldCheck, Moon, Sun, Calendar, Stethoscope } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenPhoneBooking: () => void;
  onNavigateToBooking: () => void;
  onNavigateToDoctor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenPhoneBooking,
  onNavigateToBooking,
  onNavigateToDoctor
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 text-white shadow-md shadow-cyan-500/25">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.5 2 6 4.5 6 7.5c0 2 .8 4.2 1.8 6.5 1 2.3 2.2 4.6 2.7 6.5.2.8.9 1.5 1.8 1.5s1.6-.7 1.8-1.5c.5-1.9 1.7-4.2 2.7-6.5 1-2.3 1.8-4.5 1.8-6.5C18 4.5 15.5 2 12 2zm0 4.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Odonto<span className="text-cyan-600 dark:text-cyan-400">Sistemas</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800">
                  Cloud Live
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Clínica Dental Especializada &middot; Firestore en Tiempo Real
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#servicios" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              Servicios
            </a>
            <a href="#casos-clinicos" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              Antes & Después
            </a>
            <a href="#especialistas" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              Especialistas
            </a>
            <button
              onClick={onNavigateToBooking}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Agendar Cita
            </button>
            <button
              onClick={onNavigateToDoctor}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Stethoscope className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Panel Médico</span>
            </button>
          </nav>

          {/* Action CTAs & Dark Mode Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Button */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Alternar modo oscuro"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Quick Phone Call Button */}
            <button
              onClick={onOpenPhoneBooking}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/60 dark:border-slate-700"
              title="Llamar o simular cita telefónica inmediata"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Llamar: (601) 800-ODONTO</span>
            </button>

            {/* Primary Booking Button */}
            <button
              onClick={onNavigateToBooking}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 shadow-md shadow-cyan-600/20 hover:shadow-cyan-600/35 transition-all transform active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Agendar Cita</span>
              <span className="sm:hidden">Agendar</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
