import { useCallback, useState } from 'react';
import { origins } from '../data/destinations';
import { itineraryToText, type Itinerary } from '../lib/planner';
import { loadJSON, saveJSON } from './favoritesController';

/** Controlador 2: itinerario guardado, impresión y descarga. */
export function useItineraryController() {
  const [itinerary, setItineraryState] = useState<Itinerary | null>(() => loadJSON('rutax:itinerary', null));

  const setItinerary = useCallback((it: Itinerary | null) => {
    setItineraryState(it);
    if (it) saveJSON('rutax:itinerary', it);
    else localStorage.removeItem('rutax:itinerary');
  }, []);

  const printItinerary = useCallback(() => window.print(), []);

  const downloadItinerary = useCallback(() => {
    if (!itinerary) return;
    const label = origins.find((o) => o.id === itinerary.input.origin)?.label ?? '';
    const blob = new Blob([itineraryToText(itinerary, label)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'itinerario-rutax-hidalgo.txt';
    a.click();
    URL.revokeObjectURL(url);
  }, [itinerary]);

  const clearItinerary = useCallback(() => {
    if (window.confirm('¿Eliminar tu itinerario guardado?')) setItinerary(null);
  }, [setItinerary]);

  return { itinerary, setItinerary, printItinerary, downloadItinerary, clearItinerary };
}
