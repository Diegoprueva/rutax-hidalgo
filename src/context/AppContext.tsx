import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Destination } from '../types';
import { getDestinations } from '../services/destinationsService';
import { useFavoritesController } from '../controllers/favoritesController';
import { useItineraryController } from '../controllers/itineraryController';

type AppState = {
  destinations: Destination[];
  loading: boolean;
} & ReturnType<typeof useFavoritesController> &
  ReturnType<typeof useItineraryController>;

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const fav = useFavoritesController();
  const trip = useItineraryController();

  useEffect(() => {
    getDestinations().then((d) => {
      setDestinations(d);
      setLoading(false);
    });
  }, []);

  const value = useMemo<AppState>(
    () => ({ destinations, loading, ...fav, ...trip }),
    [destinations, loading, fav, trip],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp debe usarse dentro de AppProvider');
  return v;
}
