import { ServicioDental } from '../types';

export const SERVICIOS_DENTALES: ServicioDental[] = [
  {
    id: 'ortodoncia',
    nombre: 'Ortodoncia Digital y Alineadores',
    categoria: 'ortodoncia',
    descripcionCorta: 'Alineación perfecta mediante brackets estéticos de zafiro o alineadores invisibles de última generación.',
    descripcionLarga: 'Corregimos malposiciones dentales y problemas de mordida utilizando escaneo intraoral 3D sin moldes incómodos. Diseñamos tu sonrisa ideal desde la primera sesión con simulación virtual del resultado.',
    duracionEstimada: '12 a 18 meses (controles mensuales)',
    beneficios: [
      'Escaneo 3D intraoral de alta precisión',
      'Opción de brackets transparentes o alineadores invisibles',
      'Sin molestias de alambres tradicionales con tecnología térmica',
      'Financiamiento personalizado por etapas'
    ],
    icono: 'Sparkles',
    precioDesde: '$180 USD / fase inicial',
    etiqueta: 'Más Solicitado',
    imagen: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'implantes',
    nombre: 'Implantes Dentales & Carga Inmediata',
    categoria: 'implantes',
    descripcionCorta: 'Recupera piezas dentales perdidas con tornillos de titanio biocompatible y coronas de zirconio ultra resistentes.',
    descripcionLarga: 'Procedimiento quirúrgico guiado por tomografía computarizada (CBCT). Permite colocar piezas fijas idénticas al diente natural en funcionalidad y estética, con técnica de carga inmediata en 24-48 horas.',
    duracionEstimada: 'Procedimiento de 45-60 min por implante',
    beneficios: [
      'Titanio grado médico con garantía de osteointegración de por vida',
      'Cirugía guiada por computador mínimamente invasiva',
      'Sedación consciente disponible para máxima tranquilidad',
      'Sensación y fuerza masticatoria exactamente igual a un diente real'
    ],
    icono: 'ShieldCheck',
    precioDesde: '$450 USD por implante',
    etiqueta: 'Garantía Vitalicia',
    imagen: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'estetica',
    nombre: 'Estética Dental & Diseño de Sonrisa',
    categoria: 'estetica',
    descripcionCorta: 'Carillas de porcelana E-max, blanqueamiento láser fotoactivado y remodelado gingival de alta precisión.',
    descripcionLarga: 'Transformación armónica de tu sonrisa según tus facciones faciales. Utilizamos micro-carillas cerámicas ultrafinas (0.3 mm) sin desgaste excesivo del esmalte y blanqueamiento clínico Philips Zoom.',
    duracionEstimada: '2 a 3 citas especializadas',
    beneficios: [
      'Diseño digital DSD (Digital Smile Design) adaptado a tu rostro',
      'Blanqueamiento de hasta 8 tonos en 1 sola sesión de 45 min',
      'Carillas de porcelana libres de manchas y de brillo permanente',
      'Prueba estética previa (Mock-up) antes de iniciar'
    ],
    icono: 'Smile',
    precioDesde: '$220 USD por carilla',
    etiqueta: 'Especialidad Premium',
    imagen: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'endodoncia',
    nombre: 'Endodoncia Microscópica',
    categoria: 'general',
    descripcionCorta: 'Salvamos tu diente natural eliminando infecciones profundas en 1 sola sesión con magnificación óptica.',
    descripcionLarga: 'Tratamiento de conducto indoloro gracias a la anestesia computarizada y microscopio clínico de alta resolución que localiza todos los conductos radiculares con máxima seguridad.',
    duracionEstimada: '60 a 90 min (1 sesión)',
    beneficios: [
      'Alivio inmediato del dolor dental agudo',
      'Microscopio clínico Carl Zeiss para visión micrométrica',
      'Instrumentación rotatoria de níquel-titanio',
      'Sellado termoplástico hermético tridimensional'
    ],
    icono: 'HeartPulse',
    precioDesde: '$120 USD',
    imagen: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'limpieza',
    nombre: 'Profilaxis Profunda & Air-Flow',
    categoria: 'general',
    descripcionCorta: 'Higiene dental avanzada con ultrasonido y spray micro-pulverizado de bicarbonato y glicina.',
    descripcionLarga: 'Elimina sarro subgingival, manchas de café/té/tabaco y placa bacteriana sin dolor ni rayar el esmalte, dejando un aliento fresco y dientes visiblemente limpios.',
    duracionEstimada: '40 minutos',
    beneficios: [
      'Tecnología Air-Flow indolora que no lesiona las encías',
      'Eliminación de manchas superficiales al 100%',
      'Aplicación de barniz de flúor remineralizante',
      'Prevención definitiva de gingivitis y periodontitis'
    ],
    icono: 'Droplets',
    precioDesde: '$45 USD',
    imagen: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'odontopediatria',
    nombre: 'Odontopediatría Amigable',
    categoria: 'general',
    descripcionCorta: 'Cuidado dental especializado para niños en un ambiente lúdico, empático y libre de miedo.',
    descripcionLarga: 'Atención dental infantil con enfoque en prevención, sellantes de fosas y fisuras, ortopedia maxilar temprana y técnicas de adaptación psicológica positiva.',
    duracionEstimada: '30 a 45 minutos',
    beneficios: [
      'Ambiente diseñado para generar confianza y cero trauma',
      'Premios y diplomas de valentía para los pequeños',
      'Instrucción de cepillado divertido y supervisado',
      'Detección precoz de problemas de mordida en crecimiento'
    ],
    icono: 'Sparkle',
    precioDesde: '$40 USD',
    imagen: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  }
];
