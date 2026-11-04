import { useMemo, useState } from 'react';
import { INTERESTS, type Destination, type Interest } from '../types';

const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/** Controlador 3: búsqueda y filtros del catálogo. */
export function useExploreController(destinations: Destination[], initialCategory: string | null) {
  const [q, setQ] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [category, setCategory] = useState<Interest | ''>(
    INTERESTS.some((i) => i.id === initialCategory) ? (initialCategory as Interest) : '',
  );
  const [maxCost, setMaxCost] = useState('');

  const municipalities = useMemo(() => [...new Set(destinations.map((d) => d.municipality))].sort(), [destinations]);

  const results = useMemo(() => {
    const term = norm(q.trim());
    return destinations.filter((d) => {
      if (term && !norm(`${d.name} ${d.municipality} ${d.description} ${d.tagline}`).includes(term)) return false;
      if (municipality && d.municipality !== municipality) return false;
      if (category && !d.interests.includes(category)) return false;
      if (maxCost && d.entryFee + d.mealCost > Number(maxCost)) return false;
      return true;
    });
  }, [destinations, q, municipality, category, maxCost]);

  const clear = () => {
    setQ('');
    setMunicipality('');
    setCategory('');
    setMaxCost('');
  };

  return { q, setQ, municipality, setMunicipality, category, setCategory, maxCost, setMaxCost, municipalities, results, clear };
}
