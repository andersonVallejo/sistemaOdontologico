import React, { useState, useEffect } from 'react';
import { DOCTORES_CLINICA } from '../data/doctorsData';
import { CitaDental, EstadoCita, Doctor } from '../types';
import { suscribirCitas, actualizarEstadoCita, eliminarCita, guardarCita, generarCodigoConfirmacion } from '../firebase';
import {
  Stethoscope,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Trash2,
  Search,
  Filter,
  PlusCircle,
  ExternalLink,
  Phone,
  RefreshCw,
  Sparkles,
  Calendar,
  AlertTriangle,
  UserCheck,
  Check,
  Copy
} from 'lucide-react';

export const DoctorAdminPanel: React.FC = () => {
  // Simulated Doctor Login State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(DOCTORES_CLINICA[0]);
  const [enteredPin, setEnteredPin] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Firestore Live Data
  const [citas, setCitas] = useState<CitaDental[]>([]);
  const [loading, setLoading] = useState(true);
  const [firestoreConnected, setFirestoreConnected] = useState(true);

  // Filtering & Search
  const [statusFilter, setStatusFilter] = useState<'todas' | EstadoCita | 'hoy'>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionInProgressId, setActionInProgressId] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Subscribe to Firestore in real-time
  useEffect(() => {
    setLoading(true);
    const unsubscribe = suscribirCitas(
      (data) => {
        setCitas(data);
        setLoading(false);
        setFirestoreConnected(true);
      },
      (error) => {
        console.error('Error al escuchar citas en Firestore:', error);
        setLoading(false);
        setFirestoreConnected(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    // Accept PIN '1234' or any 4-digit PIN for convenience
    if (enteredPin.trim() === '1234' || enteredPin.length >= 4) {
      setIsAuthenticated(true);
      setEnteredPin('');
    } else {
      setLoginError('PIN incorrecto. Puedes usar el PIN demo: 1234');
    }
  };

  const handleQuickDemoLogin = () => {
    setEnteredPin('1234');
    setIsAuthenticated(true);
  };

  const handleUpdateStatus = async (id: string, nuevoEstado: EstadoCita) => {
    setActionInProgressId(id);
    setActionFeedback(null);
    try {
      await actualizarEstadoCita(id, nuevoEstado);
      setActionFeedback(`Estado actualizado a "${nuevoEstado}" en Firestore`);
      setTimeout(() => setActionFeedback(null), 3000);
    } catch (err) {
      console.error('Error actualizando estado:', err);
      alert('Error al actualizar en Firestore.');
    } finally {
      setActionInProgressId(null);
    }
  };

  const handleDeleteCita = async (id: string, nombre: string) => {
    if (!window.confirm(`¿Seguro que deseas eliminar permanentemente la cita de ${nombre}?`)) {
      return;
    }
    setActionInProgressId(id);
    try {
      await eliminarCita(id);
      setActionFeedback('Cita eliminada de Firestore');
      setTimeout(() => setActionFeedback(null), 3000);
    } catch (err) {
      console.error('Error eliminando cita:', err);
      alert('Error al eliminar en Firestore.');
    } finally {
      setActionInProgressId(null);
    }
  };

  // Helper to create immediate test appointment in Firestore
  const handleCreateTestCita = async () => {
    try {
      const nombresPrueba = ['Valentina Gómez', 'Mateo Ramírez', 'Camila Torres', 'Javier Herrera', 'Daniela Restrepo'];
      const serviciosPrueba = [
        'Ortodoncia Digital y Alineadores',
        'Implantes Dentales & Carga Inmediata',
        'Estética Dental & Diseño de Sonrisa'
      ];
      const randomNombre = nombresPrueba[Math.floor(Math.random() * nombresPrueba.length)];
      const randomServicio = serviciosPrueba[Math.floor(Math.random() * serviciosPrueba.length)];
      const randomCodigo = generarCodigoConfirmacion();

      const todayStr = new Date().toISOString().split('T')[0];

      await guardarCita({
        codigo: randomCodigo,
        nombre: randomNombre,
        telefono: `+57 300 ${Math.floor(1000000 + Math.random() * 9000000)}`,
        servicio: randomServicio,
        fecha: todayStr,
        hora: '11:00 AM',
        estado: 'pendiente',
        notas: 'Cita de prueba generada desde el panel médico para validación en tiempo real'
      });

      setActionFeedback(`Cita de prueba ${randomCodigo} agregada exitosamente`);
      setTimeout(() => setActionFeedback(null), 3000);
    } catch (err) {
      console.error('Error al crear cita de prueba:', err);
      alert('No se pudo generar la cita de prueba.');
    }
  };

  // Today string YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Filtering calculations
  const filteredCitas = citas.filter((cita) => {
    // Status Filter
    if (statusFilter === 'hoy') {
      if (cita.fecha !== todayStr) return false;
    } else if (statusFilter !== 'todas') {
      if (cita.estado !== statusFilter) return false;
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = cita.nombre.toLowerCase().includes(q);
      const matchCode = cita.codigo.toLowerCase().includes(q);
      const matchPhone = cita.telefono.toLowerCase().includes(q);
      const matchService = cita.servicio.toLowerCase().includes(q);
      return matchName || matchCode || matchPhone || matchService;
    }

    return true;
  });

  // Metrics
  const totalCitas = citas.length;
  const pendientesCount = citas.filter((c) => c.estado === 'pendiente').length;
  const completadasCount = citas.filter((c) => c.estado === 'completada').length;
  const canceladasCount = citas.filter((c) => c.estado === 'cancelada').length;
  const hoyCount = citas.filter((c) => c.fecha === todayStr).length;

  return (
    <section id="panel-doctor" className="py-16 sm:py-24 bg-slate-100/70 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2 border border-cyan-200 dark:border-cyan-800">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Portal Exclusivo para Doctores</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Panel Clínico de Control en Tiempo Real
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Conexión directa y sincrónica con <strong className="text-cyan-600 dark:text-cyan-400">Google Firestore</strong> colección <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs text-cyan-700 dark:text-cyan-300">citas_dentales</code>.
            </p>
          </div>

          {/* Firestore Live Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${firestoreConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
              <span>{firestoreConnected ? 'Firestore: En Vivo (onSnapshot)' : 'Desconectado'}</span>
            </div>

            {isAuthenticated && (
              <button
                onClick={handleCreateTestCita}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-semibold shadow-sm transition-colors"
                title="Genera una cita automática en Firestore para verificar el tiempo real"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Cita de Prueba</span>
              </button>
            )}
          </div>
        </div>

        {/* Feedback Alert Toast */}
        {actionFeedback && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fade-in shadow-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>{actionFeedback}</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Sincronizado</span>
          </div>
        )}

        {/* SIMULATED LOGIN WALL */}
        {!isAuthenticated ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl max-w-xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-600/25">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Acceso Médico Protegido
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
              Ingresa con tu perfil de doctor para consultar las citas en tiempo real y actualizar los estados clínicos.
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4 text-left">
              {/* Doctor Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Selecciona tu Usuario Médico
                </label>
                <select
                  value={selectedDoctor.id}
                  onChange={(e) => {
                    const doc = DOCTORES_CLINICA.find((d) => d.id === e.target.value);
                    if (doc) setSelectedDoctor(doc);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                >
                  {DOCTORES_CLINICA.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.nombre} - {doc.especialidad}
                    </option>
                  ))}
                </select>
              </div>

              {/* PIN Code */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    PIN de Seguridad Médica
                  </label>
                  <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">
                    (Demo: 1234)
                  </span>
                </div>
                <input
                  type="password"
                  placeholder="Introduce PIN (ej: 1234)"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  maxLength={8}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 tracking-widest text-center"
                />
              </div>

              {loginError && (
                <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs text-center">
                  {loginError}
                </div>
              )}

              {/* Login Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white font-bold text-sm shadow-md shadow-cyan-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Ingresar al Panel Clínico</span>
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Acceso Rápido de Evaluación (1 Clic)</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DOCTOR DASHBOARD */
          <div className="space-y-6 animate-fade-in">
            
            {/* Doctor Active Session Header */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedDoctor.avatar}
                  alt={selectedDoctor.nombre}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-cyan-500/30"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {selectedDoctor.nombre}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <UserCheck className="w-3 h-3" />
                      Sesión Activa
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedDoctor.especialidad} &middot; {selectedDoctor.registroMedico}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>

            {/* Metrics KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Total Citas
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 block">
                  {totalCitas}
                </span>
                <span className="text-[10px] text-slate-400">En Firestore</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                  Pendientes
                </span>
                <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-1 block">
                  {pendientesCount}
                </span>
                <span className="text-[10px] text-slate-400">Por atender</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  Completadas
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
                  {completadasCount}
                </span>
                <span className="text-[10px] text-slate-400">Atendidas</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                  Canceladas
                </span>
                <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1 block">
                  {canceladasCount}
                </span>
                <span className="text-[10px] text-slate-400">Anuladas</span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-cyan-200 dark:border-cyan-800 shadow-sm">
                <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block">
                  Para Hoy
                </span>
                <span className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 mt-1 block">
                  {hoyCount}
                </span>
                <span className="text-[10px] text-slate-400">{todayStr}</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
              
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
                {[
                  { id: 'todas', label: `Todas (${totalCitas})` },
                  { id: 'pendiente', label: `Pendientes (${pendientesCount})` },
                  { id: 'completada', label: `Completadas (${completadasCount})` },
                  { id: 'cancelada', label: `Canceladas (${canceladasCount})` },
                  { id: 'hoy', label: `Citas de Hoy (${hoyCount})` }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      statusFilter === tab.id
                        ? 'bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Field */}
              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar paciente, código o tel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

            </div>

            {/* Main Appointments Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              
              {loading ? (
                <div className="p-16 text-center">
                  <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Sincronizando con Google Firestore en tiempo real...
                  </p>
                </div>
              ) : filteredCitas.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    No hay citas que coincidan con los filtros
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    {searchQuery
                      ? 'Prueba modificando el texto de búsqueda.'
                      : 'Puedes pulsar el botón "+ Cita de Prueba" para generar un registro inmediatamente en Firestore.'}
                  </p>
                  <button
                    onClick={handleCreateTestCita}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Crear Cita de Prueba Ahora</span>
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <th className="py-3.5 px-4 sm:px-6">Código</th>
                        <th className="py-3.5 px-4">Paciente</th>
                        <th className="py-3.5 px-4">Servicio Dental</th>
                        <th className="py-3.5 px-4">Fecha & Hora</th>
                        <th className="py-3.5 px-4">Estado</th>
                        <th className="py-3.5 px-4">Notas / Origen</th>
                        <th className="py-3.5 px-4 sm:px-6 text-right">Acciones Firestore</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-700 dark:text-slate-300">
                      {filteredCitas.map((cita) => {
                        const isActionRunning = actionInProgressId === cita.id;

                        return (
                          <tr
                            key={cita.id}
                            className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                          >
                            {/* Confirmation Code */}
                            <td className="py-4 px-4 sm:px-6 font-mono font-bold text-cyan-700 dark:text-cyan-400 whitespace-nowrap">
                              <span className="inline-block px-2.5 py-1 rounded-md bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200/60 dark:border-cyan-800">
                                {cita.codigo}
                              </span>
                            </td>

                            {/* Patient Info */}
                            <td className="py-4 px-4">
                              <div className="font-bold text-slate-900 dark:text-white">
                                {cita.nombre}
                              </div>
                              <a
                                href={`tel:${cita.telefono}`}
                                className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors mt-0.5"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{cita.telefono}</span>
                              </a>
                            </td>

                            {/* Service */}
                            <td className="py-4 px-4">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {cita.servicio}
                              </span>
                            </td>

                            {/* Date and Time */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="font-medium text-slate-900 dark:text-white">
                                {cita.fecha}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-cyan-500" />
                                <span>{cita.hora}</span>
                              </div>
                            </td>

                            {/* Status Badge */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              {cita.estado === 'pendiente' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                  <Clock className="w-3 h-3" />
                                  Pendiente
                                </span>
                              )}
                              {cita.estado === 'completada' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Completada
                                </span>
                              )}
                              {cita.estado === 'cancelada' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                                  <XCircle className="w-3 h-3" />
                                  Cancelada
                                </span>
                              )}
                            </td>

                            {/* Notes */}
                            <td className="py-4 px-4 max-w-xs truncate text-[11px] text-slate-500 dark:text-slate-400" title={cita.notas}>
                              {cita.notas || 'Sin notas adicionales'}
                            </td>

                            {/* Direct Actions Modifying Firestore */}
                            <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                
                                {/* Button: Completar */}
                                {cita.estado !== 'completada' && (
                                  <button
                                    onClick={() => handleUpdateStatus(cita.id!, 'completada')}
                                    disabled={isActionRunning}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all disabled:opacity-50"
                                    title="Marcar como Completada en Firestore"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Completar</span>
                                  </button>
                                )}

                                {/* Button: Cancelar */}
                                {cita.estado !== 'cancelada' && (
                                  <button
                                    onClick={() => handleUpdateStatus(cita.id!, 'cancelada')}
                                    disabled={isActionRunning}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition-all disabled:opacity-50"
                                    title="Marcar como Cancelada en Firestore"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Cancelar</span>
                                  </button>
                                )}

                                {/* Button: Reabrir si ya está completada o cancelada */}
                                {cita.estado !== 'pendiente' && (
                                  <button
                                    onClick={() => handleUpdateStatus(cita.id!, 'pendiente')}
                                    disabled={isActionRunning}
                                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    title="Revertir a Pendiente"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                  </button>
                                )}

                                {/* Button: Eliminar permanentemente */}
                                <button
                                  onClick={() => handleDeleteCita(cita.id!, cita.nombre)}
                                  disabled={isActionRunning}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                                  title="Eliminar registro"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Table Footer info */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
                <span>
                  Mostrando <strong className="text-slate-700 dark:text-slate-300">{filteredCitas.length}</strong> de <strong className="text-slate-700 dark:text-slate-300">{totalCitas}</strong> citas registradas en tiempo real.
                </span>
                <span className="text-[11px]">
                  Cualquier cita añadida desde la web se refleja aquí instantáneamente.
                </span>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
