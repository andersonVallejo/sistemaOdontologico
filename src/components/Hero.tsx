import React from 'react';
import { Calendar, Phone, Sparkles, ShieldCheck, Clock, Award, CheckCircle2, ChevronRight } from 'lucide-react';

interface HeroProps {
  onNavigateToBooking: () => void;
  onOpenPhoneBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToBooking, onOpenPhoneBooking }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background ambient decorative blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-400/20 via-teal-300/15 to-transparent blur-3xl pointer-events-none rounded-full dark:from-cyan-600/10 dark:via-teal-500/10"></div>
      <div className="absolute -top-12 -right-12 w-96 h-96 bg-cyan-200/25 dark:bg-cyan-900/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200/80 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs font-semibold tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-cyan-500"></span>
              <span>Clínica Odontológica de Alta Gama &middot; Google Cloud Firestore</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 ml-1" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Tu sonrisa perfecta <br />
              <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
                con tecnología médica 3D
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              En <strong className="text-slate-900 dark:text-white font-semibold">OdontoSistemas</strong> transformamos tu salud bucodental con especialistas en 
              <span className="text-cyan-600 dark:text-cyan-400 font-medium"> Ortodoncia Digital</span>, 
              <span className="text-cyan-600 dark:text-cyan-400 font-medium"> Implantes en 24h</span> y 
              <span className="text-cyan-600 dark:text-cyan-400 font-medium"> Estética Dental</span> de precisión. 
              Agenda tu consulta hoy con confirmación inmediata en la nube.
            </p>

            {/* Key feature check bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                <span className="font-medium">Sin dolor ni traumas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                <span className="font-medium">Tomografía 3D guiada</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                <span className="font-medium">Código instantáneo</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onNavigateToBooking}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 shadow-lg shadow-cyan-600/30 hover:shadow-cyan-600/40 transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Agendar Cita en Línea</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPhoneBooking}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Agendar por Llamada Rápida</span>
              </button>
            </div>

            {/* Trust badge row */}
            <div className="flex items-center gap-4 pt-4 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Garantía Médica Certificada</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Atención Puntual 100%</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Especialistas Colegiados</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card with Clinical Highlights */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-cyan-500/20 via-teal-500/10 to-transparent border border-cyan-500/30 shadow-2xl backdrop-blur-sm">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=85"
                    alt="OdontoSistemas Clínica Dental Moderna"
                    className="w-full h-80 object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  {/* Overlaid highlight caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs uppercase tracking-wider font-bold text-cyan-400">
                        Tecnología OdontoSistemas
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                        Disponibilidad Hoy
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      Equipos de Tomografía Cone Beam 3D y Sillones Ergonómicos con Masaje Lumbar
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card 1: Experience */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-fade-in">
                <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">+15 Años</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Cuidando Sonrisas</p>
                </div>
              </div>

              {/* Floating Stat Card 2: Satisfied Patients */}
              <div className="absolute -top-5 -right-5 bg-white dark:bg-slate-800 p-3.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">99.8% Éxito</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">En Tratamientos 3D</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
