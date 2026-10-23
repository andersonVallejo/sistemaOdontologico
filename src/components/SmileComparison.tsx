import React, { useState } from 'react';
import { Sparkles, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  servicio: string;
  tiempo: string;
  descripcion: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  detalles: string[];
}

const CASES: CaseStudy[] = [
  {
    id: 'ortodoncia',
    title: 'Caso Ortodoncia Invisible 3D',
    servicio: 'Ortodoncia',
    tiempo: '8 meses con alineadores',
    descripcion: 'Corrección de apiñamiento severo anterior y alineación de mordida cruzada con alineadores termoplásticos transparentes.',
    beforeImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80',
    afterImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80',
    beforeLabel: 'Antes: Apiñamiento & Mordida',
    afterLabel: 'Después: Alineación Perfecta',
    detalles: ['Sin brackets metálicos', 'Escaneo intraoral sin moldes', 'Comodidad total al comer']
  },
  {
    id: 'estetica',
    title: 'Diseño de Sonrisa & Carillas E-Max',
    servicio: 'Estética Dental',
    tiempo: '2 citas clínicas',
    descripcion: 'Diseño digital con 6 carillas de porcelana ultrafina E-Max más blanqueamiento fotoactivado Zoom.',
    beforeImg: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=900&q=80',
    afterImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80',
    beforeLabel: 'Antes: Desgaste & Manchas',
    afterLabel: 'Después: Brillo & Armonía',
    detalles: ['Tono blanco natural', 'Resistencia superior al café', 'Gingivoplastia láser']
  },
  {
    id: 'implantes',
    title: 'Rehabilitación con Implante de Titanio',
    servicio: 'Implantes',
    tiempo: 'Carga fija en 24 horas',
    descripcion: 'Colocación de implante de titanio biocompatible guiado por tomografía 3D con corona fija de zirconio monolítico.',
    beforeImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',
    afterImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
    beforeLabel: 'Antes: Pérdida dental',
    afterLabel: 'Después: Corona fija idéntica',
    detalles: ['Garantía de por vida', 'Capacidad masticatoria 100%', 'Cirugía mínimamente invasiva']
  }
];

interface SmileComparisonProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const SmileComparison: React.FC<SmileComparisonProps> = ({ onSelectServiceForBooking }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100

  const activeCase = CASES[activeCaseIndex];

  return (
    <section id="casos-clinicos" className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-200/60 dark:border-teal-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Resultados Reales OdontoSistemas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Visualizador Interactivo de Transformación
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base">
            Desliza el control interactivo para comparar el estado previo y la sonrisa final obtenida con nuestros tratamientos clínicos.
          </p>
        </div>

        {/* Case Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CASES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPos(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                activeCaseIndex === idx
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/25 ring-2 ring-cyan-500/30'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{item.servicio}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeCaseIndex === idx ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}>
                {item.tiempo}
              </span>
            </button>
          ))}
        </div>

        {/* Main Interactive Comparison Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
          
          {/* Interactive Before/After Visual Box */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden select-none shadow-inner border border-slate-200 dark:border-slate-700 group">
              
              {/* After Image (Background layer) */}
              <img
                src={activeCase.afterImg}
                alt={activeCase.afterLabel}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-emerald-600/90 text-white text-xs font-bold rounded-lg backdrop-blur-sm shadow">
                {activeCase.afterLabel}
              </span>

              {/* Before Image (Clipped layer according to slider position) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={activeCase.beforeImg}
                  alt={activeCase.beforeLabel}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', height: '100%' }}
                />
                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-slate-900/80 text-white text-xs font-bold rounded-lg backdrop-blur-sm shadow">
                  {activeCase.beforeLabel}
                </span>
              </div>

              {/* Slider Line Divider */}
              <div
                className="absolute inset-y-0 w-1 bg-white shadow-2xl cursor-ew-resize z-20 flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-lg border-2 border-cyan-500 flex items-center justify-center transform -translate-x-1/2 text-xs font-bold">
                  ↔
                </div>
              </div>

              {/* Invisible native range input for smooth touch and mouse sliding */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                aria-label="Deslizar para comparar antes y después"
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />
            </div>

            {/* Slider Instructions */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-3 px-1">
              <span>◀ Desliza a la izquierda para ver el resultado</span>
              <span>Desliza a la derecha para ver el antes ▶</span>
            </div>
          </div>

          {/* Details & Action Column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Especialidad: {activeCase.servicio}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {activeCase.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                {activeCase.descripcion}
              </p>
            </div>

            {/* Bullet Highlights */}
            <div className="space-y-2.5 pt-2">
              {activeCase.detalles.map((detalle, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>{detalle}</span>
                </div>
              ))}
            </div>

            {/* Treatment Duration Card */}
            <div className="p-3.5 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200/60 dark:border-cyan-800 text-xs text-cyan-900 dark:text-cyan-200 flex items-center justify-between">
              <span className="font-semibold">Tiempo total de tratamiento:</span>
              <span className="font-bold text-cyan-700 dark:text-cyan-300">{activeCase.tiempo}</span>
            </div>

            {/* Action CTA for this service */}
            <button
              onClick={() => onSelectServiceForBooking(activeCase.servicio)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white font-semibold shadow-md shadow-cyan-600/20 transition-all transform active:scale-95"
            >
              <span>Quiero agendar para {activeCase.servicio}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
