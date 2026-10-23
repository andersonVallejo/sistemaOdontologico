import React from 'react';
import { Phone, MapPin, Clock, Mail, ShieldCheck, Stethoscope } from 'lucide-react';

interface FooterProps {
  onNavigateToDoctor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToDoctor }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 text-slate-950 font-black shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.5 2 6 4.5 6 7.5c0 2 .8 4.2 1.8 6.5 1 2.3 2.2 4.6 2.7 6.5.2.8.9 1.5 1.8 1.5s1.6-.7 1.8-1.5c.5-1.9 1.7-4.2 2.7-6.5 1-2.3 1.8-4.5 1.8-6.5C18 4.5 15.5 2 12 2zm0 4.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z" />
                </svg>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Odonto<span className="text-cyan-400">Sistemas</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clínica odontológica de vanguardia especializada en ortodoncia digital, implantes dentales en 24h y diseño de sonrisa con respaldo en la nube.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Google Cloud Firestore Activo</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Especialidades
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Ortodoncia Digital e Invisalign</a></li>
              <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Implantes Dentales Guiados 3D</a></li>
              <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Estética Dental & Carillas E-Max</a></li>
              <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Endodoncia en 1 Sesión</a></li>
              <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Profilaxis Profunda Air-Flow</a></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Atención & Sede
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Av. Médica 105, Edificio OdontoCenter, Piso 4</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Lun a Vie: 7:00 AM - 7:00 PM | Sáb: 8:00 AM - 2:00 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>PBX: (601) 800-ODONTO &middot; +57 312 984 5510</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>citas@odontosistemas.com</span>
              </li>
            </ul>
          </div>

          {/* Doctor Portal CTA */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
              Acceso a Profesionales
            </h4>
            <p className="text-xs text-slate-400">
              Portal restringido para doctores y personal clínico para gestión de la agenda.
            </p>
            <button
              onClick={onNavigateToDoctor}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-cyan-400 hover:text-cyan-300 border border-slate-700 text-xs font-bold transition-all shadow-sm"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Abrir Portal de Doctores</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} OdontoSistemas. Todos los derechos reservados. Desarrollado con Google Cloud Firestore.</p>
          <div className="flex items-center gap-4">
            <span>Privacidad de Datos Médicos</span>
            <span>&bull;</span>
            <span>Términos de Servicio Clínico</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
