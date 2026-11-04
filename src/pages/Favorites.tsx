import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DestinationCard } from '../components/DestinationCard';

export function Favorites() {
  const { destinations, favorites } = useApp();
  const list = destinations.filter((d) => favorites.includes(d.id));
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-green-950">Favoritos</h1>
      {list.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-white p-8 text-center">
          <p>Aún no has guardado destinos. Toca el corazón en cualquier tarjeta.</p>
          <Link to="/explorar" className="mt-4 inline-block rounded-xl bg-green-800 px-5 py-2 font-semibold text-white">Explorar destinos</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <DestinationCard key={d.id} d={d} />
          ))}
        </div>
      )}
    </div>
  );
}
