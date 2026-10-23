import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { guardarCita, generarCodigoConfirmacion } from '../firebase';
import { Calendar, Clock, User, Phone, Sparkles, CheckCircle2, ShieldCheck, Copy, Check, AlertCircle, PhoneCall, ArrowRight } from 'lucide-react';
import { CitaDental } from '../types';

interface BookingFormProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
  phoneModalOpen: boolean;
  setPhoneModalOpen: (open: boolean) => void;
}

const AVAILABLE_HOURS = [
  '08:00 AM',
  '09:30 AM',
  '11:00 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM'
];

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedService,
  onServiceChange,
  phoneModalOpen,
  setPhoneModalOpen
}) => {
  // Form state
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(() => {
    // Default to tomorrow or today
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [hora, setHora] = useState(AVAILABLE_HOURS[1]);
  const [notas, setNotas] = useState('');
  
  // Submission state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedCita, setConfirmedCita] = useState<CitaDental | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Quick Phone Modal form state
  const [phonePatientName, setPhonePatientName] = useState('');
  const [phonePatientNumber, setPhonePatientNumber] = useState('');
  const [phoneService, setPhoneService] = useState('Consulta de Diagnóstico y Urgencia');
  const [phoneLoading, setPhoneLoading] = useState(false);

  // Today's date for minimum calendar date
  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!nombre.trim()) {
      setErrorMsg('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!telefono.trim() || telefono.length < 7) {
      setErrorMsg('Por favor ingresa un número de teléfono válido.');
      return;
    }
    if (!fecha) {
      setErrorMsg('Por favor selecciona una fecha para la cita.');
      return;
    }

    setLoading(true);

    try {
      const codigoAleatorio = generarCodigoConfirmacion();
      const citaData: Omit<CitaDental, 'id'> = {
        codigo: codigoAleatorio,
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        servicio: selectedService || 'Ortodoncia Digital y Alineadores',
        fecha,
        hora,
        estado: 'pendiente',
        notas: notas.trim() || 'Cita agendada vía web'
      };

      await guardarCita(citaData);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Ignore if confetti fails
      }

      setConfirmedCita({
        ...citaData,
        creado_en: new Date().toISOString()
      });

      // Clear form
      setNombre('');
      setTelefono('');
      setNotas('');
    } catch (err) {
      console.error('Error al guardar cita en Firestore:', err);
      setErrorMsg('Ocurrió un error al guardar la cita en Firestore. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phonePatientName.trim() || !phonePatientNumber.trim()) {
      return;
    }

    setPhoneLoading(true);
    try {
      const codigoAleatorio = generarCodigoConfirmacion();
      const citaData: Omit<CitaDental, 'id'> = {
        codigo: codigoAleatorio,
        nombre: phonePatientName.trim(),
        telefono: phonePatientNumber.trim(),
        servicio: phoneService,
        fecha: todayStr,
        hora: '10:00 AM (Prioritaria)',
        estado: 'pendiente',
        notas: 'Agendada inmediatamente vía llamada telefónica a recepción'
      };

      await guardarCita(citaData);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5 }
        });
      } catch (e) {}

      setConfirmedCita({
        ...citaData,
        creado_en: new Date().toISOString()
      });

      setPhoneModalOpen(false);
      setPhonePatientName('');
      setPhonePatientNumber('');
    } catch (err) {
      console.error('Error al guardar cita por llamada:', err);
      alert('Error al registrar la cita telefónica.');
    } finally {
      setPhoneLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section id="agendar" className="py-16 sm:py-24 relative overflow-hidden transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3 border border-cyan-200/60 dark:border-cyan-800">
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserva en Línea 24/7</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Agenda tu cita en OdontoSistemas
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Tu solicitud se almacena de forma nativa en <strong className="text-cyan-600 dark:text-cyan-400">Google Firestore</strong> y genera un código de confirmación aleatorio único.
          </p>
        </div>

        {/* Confirmation Success Screen */}
        {confirmedCita ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-teal-500/40 shadow-2xl animate-fade-in text-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-teal-500 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-teal-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-200/60 dark:border-emerald-800">
              Guardado Permanente en Firestore ('citas_dentales')
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              ¡Cita Agendada con Éxito!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-lg mx-auto">
              Estimado(a) <strong className="text-slate-900 dark:text-white">{confirmedCita.nombre}</strong>, tu cita ha sido registrada en el sistema clínico.
            </p>

            {/* Random Confirmation Code Card */}
            <div className="my-6 max-w-md mx-auto p-5 rounded-2xl bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/40 border border-cyan-300/80 dark:border-cyan-800">
              <span className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                Código de Confirmación Aleatorio
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl sm:text-4xl font-mono font-black text-cyan-600 dark:text-cyan-400 tracking-wider">
                  {confirmedCita.codigo}
                </span>
                <button
                  onClick={() => copyToClipboard(confirmedCita.codigo)}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-colors"
                  title="Copiar código"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Presenta este código al ingresar a recepción en la clínica.
              </p>
            </div>

            {/* Summary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto text-left mb-8">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Servicio:</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block">
                  {confirmedCita.servicio}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Fecha:</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {confirmedCita.fecha}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Hora:</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {confirmedCita.hora}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Teléfono:</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {confirmedCita.telefono}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setConfirmedCita(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm"
              >
                Agendar otra cita
              </button>
              <a
                href="#panel-doctor"
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20 transition-colors flex items-center gap-2"
              >
                <span>Ver en Panel de Doctores</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          /* Form Container */
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl">
            
            {/* Alternative Quick Call Banner */}
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-transparent border border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-500 text-white shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    ¿Prefieres agendar por teléfono con nuestra recepcionista?
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Registramos tu cita al instante con asignación de código en vivo.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPhoneModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-sm transition-colors shrink-0"
              >
                Llamar a Recepción
              </button>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Nombre y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Nombre Completo <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza Ramos"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Teléfono / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +57 312 984 5510"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Servicio */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Servicio Requerido <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => onServiceChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
                >
                  <option value="Ortodoncia Digital y Alineadores">Ortodoncia Digital y Alineadores (Brackets o Invisalign)</option>
                  <option value="Implantes Dentales & Carga Inmediata">Implantes Dentales & Carga Inmediata (Titanio 3D)</option>
                  <option value="Estética Dental & Diseño de Sonrisa">Estética Dental & Diseño de Sonrisa (Carillas E-Max)</option>
                  <option value="Endodoncia Microscópica">Endodoncia Microscópica (Tratamiento de Conducto 1 Sesión)</option>
                  <option value="Profilaxis Profunda & Air-Flow">Profilaxis Profunda & Air-Flow (Limpieza Ultrasónica)</option>
                  <option value="Odontopediatría Amigable">Odontopediatría Amigable (Atención Infantil)</option>
                  <option value="Consulta de Diagnóstico y Valoración 3D">Consulta de Diagnóstico y Valoración 3D</option>
                </select>
              </div>

              {/* Row 3: Fecha y Hora */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Fecha de la Cita <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Horario Disponible <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {AVAILABLE_HOURS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setHora(slot)}
                        className={`py-2 px-1 text-xs font-semibold rounded-lg border text-center transition-all ${
                          hora === slot
                            ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-400'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Notas adicionales */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Observaciones o Síntomas (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej. Presento molestia en muela superior, o quisiera cotización para alineadores..."
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl text-base font-bold text-white bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 shadow-lg shadow-cyan-600/25 hover:shadow-cyan-600/35 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Registrando en Google Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Confirmar Cita & Obtener Código</span>
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
                  Tus datos están protegidos bajo protocolos de privacidad médica y sincronizados de inmediato en la nube.
                </p>
              </div>

            </form>
          </div>
        )}

      </div>

      {/* Phone Call Quick Booking Modal */}
      {phoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-teal-500 text-white shadow-md shadow-teal-500/25">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400">
                  Línea Telefónica Directa
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Central Telefónica OdontoSistemas
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-5">
              Simula la atención de recepción telefónica. Al confirmar, la llamada registrará tu cita automáticamente en <strong>Firestore</strong> con prioridad y código asignado.
            </p>

            <form onSubmit={handlePhoneBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre del Paciente
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={phonePatientName}
                  onChange={(e) => setPhonePatientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Número de contacto"
                  value={phonePatientNumber}
                  onChange={(e) => setPhonePatientNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Motivo de la Llamada / Servicio
                </label>
                <select
                  value={phoneService}
                  onChange={(e) => setPhoneService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Consulta de Urgencia Inmediata">Consulta de Urgencia Inmediata</option>
                  <option value="Ortodoncia y Alineadores">Ortodoncia y Alineadores</option>
                  <option value="Implante Dental Inmediato">Implante Dental Inmediato</option>
                  <option value="Estética y Carillas">Estética y Carillas</option>
                  <option value="Limpieza y Prevención">Limpieza y Prevención</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPhoneModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={phoneLoading}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-600/30 flex items-center gap-1.5"
                >
                  {phoneLoading ? 'Registrando...' : 'Confirmar Llamada y Agendar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
