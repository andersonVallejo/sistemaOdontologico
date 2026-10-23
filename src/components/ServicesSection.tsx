import React, { useState } from 'react';
import { SERVICIOS_DENTALES } from '../data/servicesData';
import { ServicioDental } from '../types';
import { Sparkles, ShieldCheck, Smile, HeartPulse, Droplets, ArrowRight, Check, X, Clock, HelpCircle } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'ortodoncia' | 'implantes' | 'estetica' | 'general'>('todos');
  const [activeModalService, setActiveModalService] = useState<ServicioDental | null>(null);

  const filteredServices = selectedCategory === 'todos'
    ? SERVICIOS_DENTALES
    : SERVICIOS_DENTALES.filter(s => s.categoria === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Smile':
        return <Smile className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="servicios" className="py-16 sm:py-24 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3 border border-cyan-200/60 dark:border-cyan-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nuestras Especialidades Dentales</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Tratamientos con precisión milimétrica
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Combinamos diagnóstico computarizado 3D y materiales de estándar internacional para garantizar resultados duraderos, indoloros y estéticos.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'todos', label: 'Todos los Servicios' },
            { id: 'ortodoncia', label: 'Ortodoncia & Alineadores' },
            { id: 'implantes', label: 'Implantes & Cirugía' },
            { id: 'estetica', label: 'Estética & Sonrisa' },
            { id: 'general', label: 'Salud & Prevención' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-md shadow-slate-900/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white dark:bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={service.imagen}
                  alt={service.nombre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                
                {/* Floating Category Icon Badge */}
                <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-cyan-600 dark:text-cyan-400 shadow-lg">
                  {getIcon(service.icono)}
                </div>

                {/* Tag pill if available */}
                {service.etiqueta && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-cyan-600 text-white text-xs font-bold shadow-md shadow-cyan-600/30">
                    {service.etiqueta}
                  </div>
                )}

                {/* Price starting indicator */}
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[11px] font-medium text-slate-300 block">Desde</span>
                  <span className="text-sm font-bold text-white">{service.precioDesde}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {service.nombre}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {service.descripcionCorta}
                  </p>

                  {/* Bullet Benefits */}
                  <ul className="mt-4 space-y-2">
                    {service.beneficios.slice(0, 3).map((beneficio, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700/80 flex items-center gap-3">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="flex-1 text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-center"
                  >
                    Detalles y Pasos
                  </button>

                  <button
                    onClick={() => onSelectServiceForBooking(service.nombre)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white shadow-sm hover:shadow-cyan-600/30 transition-all"
                  >
                    <span>Agendar Cita</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Image Header */}
            <div className="relative h-44 sm:h-52 w-full bg-slate-900">
              <img
                src={activeModalService.imagen}
                alt={activeModalService.nombre}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                  OdontoSistemas Protocolo
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {activeModalService.nombre}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeModalService.descripcionLarga}
              </p>

              <div className="p-3.5 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200/60 dark:border-cyan-800 flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-cyan-900 dark:text-cyan-200 block">Duración Estimada:</span>
                  <span className="text-slate-600 dark:text-slate-300">{activeModalService.duracionEstimada}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Beneficios y Garantías OdontoSistemas:
                </h4>
                <div className="space-y-2">
                  {activeModalService.beneficios.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      <div className="p-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
                Tarifa orientativa: <strong className="text-slate-800 dark:text-slate-200">{activeModalService.precioDesde}</strong> (sujeto a valoración y tomografía clínica).
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  const serviceName = activeModalService.nombre;
                  setActiveModalService(null);
                  onSelectServiceForBooking(serviceName);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-teal-500 text-white hover:from-cyan-500 hover:to-teal-400 shadow-md shadow-cyan-600/25 transition-all flex items-center gap-2"
              >
                <span>Agendar Cita para este Servicio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
