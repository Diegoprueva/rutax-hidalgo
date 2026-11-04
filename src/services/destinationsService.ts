import type { Destination } from '../types';
import { destinations } from '../data/destinations';

/**
 * Punto único de acceso a la información turística.
 * Hoy devuelve el catálogo de demostración local. Para conectar una API real,
 * define VITE_API_URL (se espera GET {VITE_API_URL}/destinations → Destination[]).
 * Si la API falla, se usa el catálogo local.
 */
export async function getDestinations(): Promise<Destination[]> {
  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/destinations`);
      if (res.ok) return (await res.json()) as Destination[];
    } catch {
      /* se usa el catálogo local */
    }
  }
  return destinations;
}
