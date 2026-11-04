import type { Destination, OriginId, ZoneId } from '../types';

/**
 * DATOS DE DEMOSTRACIÓN.
 * Precios, horarios y duraciones son estimaciones NO verificadas.
 * Para producción, reemplazar por una fuente verificable (ver src/services/destinationsService.ts).
 */
const SOURCE = 'Dato de demostración — verificar con la oficina de turismo del municipio o la Secretaría de Turismo de Hidalgo';

export const destinations: Destination[] = [
  {
    id: 'huasca-de-ocampo',
    name: 'Huasca de Ocampo',
    municipality: 'Huasca de Ocampo',
    zone: 'sierra-pachuca',
    tagline: 'Pueblo Mágico entre haciendas y bosques',
    description:
      'Pueblo Mágico de calles empedradas y casas de teja, conocido por sus antiguas haciendas, su entorno boscoso y su ambiente tranquilo. Ideal para caminar, comer bien y descansar.',
    interests: ['descanso', 'gastronomia', 'naturaleza', 'cultura'],
    activities: [
      { interest: 'cultura', text: 'Recorrer el centro histórico y la plaza principal' },
      { interest: 'gastronomia', text: 'Probar cocina regional en restaurantes del centro' },
      { interest: 'naturaleza', text: 'Paseo por los alrededores boscosos del pueblo' },
      { interest: 'descanso', text: 'Tarde tranquila en café o jardín de hacienda' },
    ],
    tips: ['Lleva ropa abrigadora: puede hacer fresco.', 'Los fines de semana suele haber más visitantes.'],
    schedule: null,
    entryFee: 0,
    mealCost: 160,
    visitHours: 4,
    mapQuery: 'Huasca de Ocampo, Hidalgo',
    image: { palette: ['#14532d', '#86a873', '#f1e8d0'], motif: 'town' },
    imageAlt: 'Ilustración de un pueblo con casas de teja rodeado de bosque verde',
    verified: false,
    source: SOURCE,
  },
  {
    id: 'prismas-basalticos',
    name: 'Prismas Basálticos de Santa María Regla',
    municipality: 'Huasca de Ocampo',
    zone: 'sierra-pachuca',
    tagline: 'Columnas de roca junto a una barranca',
    description:
      'Formación de columnas de basalto con una cascada y un cañón. Un paisaje singular para fotografía y caminatas cortas.',
    interests: ['naturaleza', 'aventura'],
    activities: [
      { interest: 'naturaleza', text: 'Caminar por los senderos y miradores de la barranca' },
      { interest: 'aventura', text: 'Preguntar por actividades como tirolesa o paseos guiados' },
      { interest: 'naturaleza', text: 'Fotografiar las columnas de basalto y la cascada' },
    ],
    tips: ['Usa calzado con buen agarre.', 'Confirma con anticipación si el sitio está abierto por lluvias.'],
    schedule: null,
    entryFee: 60,
    mealCost: 130,
    visitHours: 3,
    mapQuery: 'Prismas Basálticos, Huasca de Ocampo, Hidalgo',
    image: { palette: ['#1f3d2b', '#6f8f72', '#e9dfc7'], motif: 'prism' },
    imageAlt: 'Ilustración de columnas de roca basáltica junto a una cascada',
    verified: false,
    source: SOURCE,
  },
  {
    id: 'real-del-monte',
    name: 'Real del Monte',
    municipality: 'Mineral del Monte',
    zone: 'sierra-pachuca',
    tagline: 'Herencia minera, neblina y pastes',
    description:
      'Antiguo pueblo minero con herencia cornuallesa, clima fresco y callejones con tiendas y cafés. Famoso por el paste, platillo de origen minero.',
    interests: ['cultura', 'gastronomia', 'aventura'],
    activities: [
      { interest: 'cultura', text: 'Visitar un museo o mina turística' },
      { interest: 'gastronomia', text: 'Comer pastes tradicionales' },
      { interest: 'cultura', text: 'Caminar por el panteón inglés y el centro' },
      { interest: 'aventura', text: 'Preguntar por recorridos en bicicleta o cuatrimoto en la zona' },
    ],
    tips: ['Lleva chamarra todo el año.', 'Estaciónate en las zonas habilitadas: las calles son estrechas.'],
    schedule: null,
    entryFee: 80,
    mealCost: 140,
    visitHours: 4,
    mapQuery: 'Real del Monte, Hidalgo',
    image: { palette: ['#3b3a36', '#8a9a7b', '#efe4cc'], motif: 'town' },
    imageAlt: 'Ilustración de un pueblo minero entre montañas con neblina',
    verified: false,
    source: SOURCE,
  },
  {
    id: 'mineral-del-chico',
    name: 'Mineral del Chico',
    municipality: 'Mineral del Chico',
    zone: 'sierra-pachuca',
    tagline: 'Bosque, peñas y senderos',
    description:
      'Pueblo Mágico junto al Parque Nacional El Chico, con formaciones rocosas, miradores, presas y rutas para senderismo y escalada.',
    interests: ['naturaleza', 'aventura', 'descanso'],
    activities: [
      { interest: 'naturaleza', text: 'Senderismo hacia miradores y peñas' },
      { interest: 'aventura', text: 'Escalada o rappel con guías locales' },
      { interest: 'descanso', text: 'Picnic o cabaña junto a la presa' },
      { interest: 'gastronomia', text: 'Probar trucha en restaurantes de la zona' },
    ],
    tips: ['Contrata guías locales para actividades de riesgo.', 'Lleva agua y protector solar.'],
    schedule: null,
    entryFee: 50,
    mealCost: 150,
    visitHours: 5,
    mapQuery: 'Mineral del Chico, Hidalgo',
    image: { palette: ['#0f3d2e', '#5f8f6b', '#f2e9d2'], motif: 'forest' },
    imageAlt: 'Ilustración de peñas rocosas sobre un bosque de pinos',
    verified: false,
    source: SOURCE,
  },
  {
    id: 'pachuca',
    name: 'Pachuca de Soto',
    municipality: 'Pachuca de Soto',
    zone: 'sierra-pachuca',
    tagline: 'Capital del estado, cuna del futbol en México',
    description:
      'Ciudad capital con centro histórico, el Reloj Monumental, museos y una amplia oferta gastronómica. Buen punto de base para recorrer la región.',
    interests: ['cultura', 'gastronomia'],
    activities: [
      { interest: 'cultura', text: 'Ver el Reloj Monumental y la Plaza Independencia' },
      { interest: 'cultura', text: 'Visitar un museo (por ejemplo, el de Futbol)' },
      { interest: 'gastronomia', text: 'Comer pastes y barbacoa de la región' },
    ],
    tips: ['Ideal para llegar en transporte público.', 'Consulta qué museos abren el día que viajes.'],
    schedule: null,
    entryFee: 60,
    mealCost: 150,
    visitHours: 4,
    mapQuery: 'Centro histórico, Pachuca de Soto, Hidalgo',
    image: { palette: ['#2f4a3a', '#a9b98f', '#f4ecd8'], motif: 'city' },
    imageAlt: 'Ilustración de una ciudad con torre de reloj al atardecer',
    verified: false,
    source: SOURCE,
  },
  {
    id: 'grutas-de-tolantongo',
    name: 'Grutas de Tolantongo',
    municipality: 'Cardonal',
    zone: 'mezquital',
    tagline: 'Aguas termales azules en el cañón',
    description:
      'Complejo de aguas termales con grutas, túneles, pozas y río de color turquesa en la región del Valle del Mezquital. Requiere un día completo.',
    interests: ['descanso', 'naturaleza', 'aventura'],
    activities: [
      { interest: 'descanso', text: 'Relajarte en las pozas termales' },
      { interest: 'naturaleza', text: 'Recorrer la gruta y el río' },
      { interest: 'aventura', text: 'Caminar por los túneles y puentes colgantes' },
    ],
    tips: ['Lleva traje de baño, sandalias y cambio de ropa.', 'Reserva alojamiento con anticipación en temporada alta.'],
    schedule: null,
    entryFee: 250,
    mealCost: 180,
    visitHours: 8,
    mapQuery: 'Grutas de Tolantongo, Cardonal, Hidalgo',
    image: { palette: ['#0e5a5c', '#58b6ad', '#f1ead6'], motif: 'canyon' },
    imageAlt: 'Ilustración de un cañón con aguas termales de color turquesa',
    verified: false,
    source: SOURCE,
  },
  {
    id: 'tula',
    name: 'Zona Arqueológica de Tula',
    municipality: 'Tula de Allende',
    zone: 'tula',
    tagline: 'Los Atlantes y la antigua Tollan',
    description:
      'Sitio arqueológico tolteca famoso por los Atlantes de Tula. Se complementa con el centro histórico y el ex convento de San José.',
    interests: ['cultura'],
    activities: [
      { interest: 'cultura', text: 'Ver los Atlantes y el juego de pelota' },
      { interest: 'cultura', text: 'Visitar el museo de sitio y el ex convento' },
    ],
    tips: ['Lleva sombrero y agua: hay poca sombra.'],
    schedule: null,
    entryFee: 90,
    mealCost: 130,
    visitHours: 3,
    mapQuery: 'Zona Arqueológica de Tula, Tula de Allende, Hidalgo',
    image: { palette: ['#6b5a2e', '#c4a95f', '#f6efdb'], motif: 'pyramid' },
    imageAlt: 'Ilustración de figuras de piedra sobre una pirámide bajo cielo despejado',
    verified: false,
    source: SOURCE,
  },
  {
    id: 'metztitlan',
    name: 'Barranca de Metztitlán',
    municipality: 'Metztitlán',
    zone: 'metztitlan',
    tagline: 'Reserva de la Biosfera y convento del siglo XVI',
    description:
      'Reserva de la Biosfera con laguna, cañones y cactáceas. En el pueblo se encuentra un ex convento agustino del siglo XVI.',
    interests: ['naturaleza', 'aventura', 'cultura'],
    activities: [
      { interest: 'naturaleza', text: 'Observar el paisaje de la barranca y la laguna' },
      { interest: 'cultura', text: 'Visitar el ex convento agustino' },
      { interest: 'aventura', text: 'Preguntar por rutas guiadas y miradores' },
    ],
    tips: ['El clima puede ser caluroso: lleva gorra.', 'Confirma servicios disponibles con anticipación.'],
    schedule: null,
    entryFee: 40,
    mealCost: 140,
    visitHours: 5,
    mapQuery: 'Metztitlán, Hidalgo',
    image: { palette: ['#5b4b2a', '#9fb27a', '#f3ead3'], motif: 'valley' },
    imageAlt: 'Ilustración de un valle amplio con cactus y montañas al fondo',
    verified: false,
    source: SOURCE,
  },
];

export const zoneNames: Record<ZoneId, string> = {
  'sierra-pachuca': 'Sierra y Comarca Minera',
  mezquital: 'Valle del Mezquital',
  tula: 'Región Tula',
  metztitlan: 'Barranca de Metztitlán',
};

export const origins: { id: OriginId; label: string }[] = [
  { id: 'cdmx', label: 'Ciudad de México' },
  { id: 'pachuca', label: 'Pachuca' },
  { id: 'puebla', label: 'Puebla' },
  { id: 'queretaro', label: 'Querétaro' },
];

/** Estimación DEMO de viaje redondo por persona (MXN), origen → zona. */
export const roundTripPerPerson: Record<OriginId, Record<ZoneId, number>> = {
  cdmx: { 'sierra-pachuca': 220, mezquital: 480, tula: 180, metztitlan: 400 },
  pachuca: { 'sierra-pachuca': 60, mezquital: 380, tula: 220, metztitlan: 260 },
  puebla: { 'sierra-pachuca': 380, mezquital: 650, tula: 420, metztitlan: 520 },
  queretaro: { 'sierra-pachuca': 420, mezquital: 380, tula: 300, metztitlan: 450 },
};

/** Estimación DEMO de cambio entre zonas (por persona) y transporte local por día (por persona). */
export const interZonePerPerson = 120;
export const localPerPersonPerDay = 40;

/** Estimación DEMO de hospedaje por habitación (2 personas) por noche. */
export const lodgingPerRoomNight: Record<ZoneId, { economico: number; comodo: number }> = {
  'sierra-pachuca': { economico: 600, comodo: 1100 },
  mezquital: { economico: 700, comodo: 1300 },
  tula: { economico: 550, comodo: 900 },
  metztitlan: { economico: 500, comodo: 850 },
};

export const DATA_DISCLAIMER =
  'Datos de demostración: precios, horarios y tiempos son estimaciones sin verificar. Confírmalos con fuentes oficiales antes de viajar.';
