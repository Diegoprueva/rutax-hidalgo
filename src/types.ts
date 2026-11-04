export type Interest = 'naturaleza' | 'aventura' | 'gastronomia' | 'cultura' | 'descanso';

export const INTERESTS: { id: Interest; label: string; emoji: string }[] = [
  { id: 'naturaleza', label: 'Naturaleza', emoji: '🌲' },
  { id: 'aventura', label: 'Aventura', emoji: '🧗' },
  { id: 'gastronomia', label: 'Gastronomía', emoji: '🍽️' },
  { id: 'cultura', label: 'Cultura', emoji: '🏛️' },
  { id: 'descanso', label: 'Descanso', emoji: '♨️' },
];

export type ZoneId = 'sierra-pachuca' | 'mezquital' | 'tula' | 'metztitlan';
export type OriginId = 'cdmx' | 'pachuca' | 'puebla' | 'queretaro';

export interface Activity {
  interest: Interest;
  text: string;
}

/** Montos en MXN por persona, salvo que se indique lo contrario. */
export interface Destination {
  id: string;
  name: string;
  municipality: string;
  zone: ZoneId;
  tagline: string;
  description: string;
  interests: Interest[];
  activities: Activity[];
  tips: string[];
  /** null = horario no verificado; la interfaz pide consultarlo con la fuente oficial. */
  schedule: string | null;
  entryFee: number;
  /** Costo estimado de una comida por persona. */
  mealCost: number;
  /** Horas sugeridas de visita (estimación de demostración). */
  visitHours: number;
  mapQuery: string;
  image: { palette: [string, string, string]; motif: 'valley' | 'canyon' | 'forest' | 'town' | 'city' | 'pyramid' | 'prism' };
  imageAlt: string;
  /** Cuando exista una fotografía con licencia, colócala aquí y reemplazará la ilustración. */
  photoUrl?: string;
  /** false = dato de demostración sin verificar con fuente oficial. */
  verified: boolean;
  source: string;
}
