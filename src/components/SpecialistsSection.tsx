import React from 'react';
import { DOCTORES_CLINICA } from '../data/doctorsData';
import { Award, ShieldCheck, Star, Calendar } from 'lucide-react';

interface SpecialistsSectionProps {
  onScheduleWithDoctor: (doctorName: string) => void;
}

export const SpecialistsSection: React.FC<SpecialistsSectionProps> = ({ onScheduleWithDoctor }) => {
  return (
    <section id="especialistas" className="py-16 sm:py-24 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-200/60 dark:border-teal-800">
            <Award className="w-3.5 h-3.5" />
            <span>Cuerpo Médico OdontoSistemas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Especialistas de Primer Nivel
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base">
            Cada tratamiento es liderado por un odontólogo especialista certificado, con formación continua y tecnología computarizada.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DOCTORES_CLINICA.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={doctor.avatar}
                    alt={doctor.nombre}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-mono text-cyan-400 bg-slate-900/70 px-2 py-0.5 rounded backdrop-blur-sm">
                      {doctor.registroMedico}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] ml-1">(5.0 / 120+ reseñas)</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {doctor.nombre}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-1">
                    {doctor.especialidad}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {doctor.experiencia} en tratamientos de alta complejidad y rehabilitación estética.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onScheduleWithDoctor(doctor.nombre)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/50 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-200/60 dark:border-cyan-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Consultar con {doctor.nombre.split(' ')[1]}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
