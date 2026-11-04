import { useCallback, useEffect, useState } from 'react';

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* almacenamiento no disponible */
  }
}

/** Controlador 1: favoritos persistentes. */
export function useFavoritesController() {
  const [favorites, setFavorites] = useState<string[]>(() => loadJSON('rutax:favorites', []));
  useEffect(() => saveJSON('rutax:favorites', favorites), [favorites]);
  const toggleFavorite = useCallback(
    (id: string) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    [],
  );
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  return { favorites, toggleFavorite, isFavorite };
}
