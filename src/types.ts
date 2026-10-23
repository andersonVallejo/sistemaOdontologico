export type EstadoCita = 'pendiente' | 'completada' | 'cancelada';

export interface CitaDental {
  id?: string;
  codigo: string;
  nombre: string;
  telefono: string;
  servicio: string;
  fecha: string;
  hora: string;
  estado: EstadoCita;
  notas?: string;
  creado_en?: string;
  doctorAsignado?: string;
}

export interface ServicioDental {
  id: string;
  nombre: string;
  categoria: 'ortodoncia' | 'implantes' | 'estetica' | 'general';
  descripcionCorta: string;
  descripcionLarga: string;
  duracionEstimada: string;
  beneficios: string[];
  icono: string;
  precioDesde: string;
  etiqueta?: string;
  imagen: string;
}

export interface Doctor {
  id: string;
  nombre: string;
  especialidad: string;
  registroMedico: string;
  experiencia: string;
  avatar: string;
}
