import { Link } from 'react-router-dom';
import type { Destination } from '../types';
import { INTERESTS } from '../types';
import { useApp } from '../context/AppContext';
import { formatMXN } from '../lib/planner';
import { DestinationImage } from './DestinationImage';

export function FavoriteButton({ id, name }: { id: string; name: string }) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(id);
  return (
    <button
      type="button"
      onClick={() => toggleFavorite(id)}
      aria-pressed={fav}
      aria-label={fav ? `Quitar ${name} de favoritos` : `Guardar ${name} en favoritos`}
      className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-xl text-rose-700 shadow hover:bg-white"
    >
      <span aria-hidden="true">{fav ? '♥' : '♡'}</span>
    </button>
  );
}

export function DestinationCard({ d }: { d: Destination }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden">
        <DestinationImage destination={d} className="h-full w-full transition group-hover:scale-105" />
        <div className="absolute right-3 top-3">
          <FavoriteButton id={d.id} name={d.name} />
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-stone-600">{d.municipality}</p>
        <h3 className="mt-1 text-lg font-semibold text-green-950">
          <Link to={`/destino/${d.id}`} className="hover:underline">
            {d.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-stone-700">{d.tagline}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Categorías">
          {d.interests.map((i) => {
            const meta = INTERESTS.find((x) => x.id === i)!;
            return (
              <li key={i} className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-900">
                <span aria-hidden="true">{meta.emoji} </span>
                {meta.label}
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-sm text-stone-700">
          Entrada aprox.: <strong>{d.entryFee === 0 ? 'Sin costo estimado' : formatMXN(d.entryFee)}</strong>
          <span className="text-stone-500"> (demo)</span>
        </p>
      </div>
    </article>
  );
}
