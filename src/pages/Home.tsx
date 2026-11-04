import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DestinationCard } from '../components/DestinationCard';
import { DestinationImage } from '../components/DestinationImage';
import { TripWidget } from '../components/TripWidget';
import { INTERESTS } from '../types';

export function Home() {
  const { destinations, loading } = useApp();
  const featured = destinations.slice(0, 3);
  const hero = destinations.find((d) => d.id === 'grutas-de-tolantongo');

  return (
    <>
      <section className="relative overflow-hidden bg-green-950 text-white">
        {hero && <DestinationImage destination={hero} variant={1} className="absolute inset-0 h-full w-full opacity-40" />}
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-sm">Turismo en el estado de Hidalgo, México</p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">Descubre Hidalgo y planea tu viaje a tu medida</h1>
          <p className="mt-4 max-w-xl text-lg text-green-50">
            Dinos tu presupuesto, cuántos días viajas y qué te gusta. RutaX arma un itinerario con gastos estimados.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/planificador" className="rounded-xl bg-[#f3e9cf] px-6 py-3 font-semibold text-green-950 hover:bg-white">
              Planear mi viaje
            </Link>
            <Link to="/explorar" className="rounded-xl border border-white px-6 py-3 font-semibold hover:bg-white/10">
              Explorar destinos
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-3" aria-labelledby="destacados">
        <div className="lg:col-span-2">
        <div className="flex items-end justify-between">
          <h2 id="destacados" className="text-2xl font-bold text-green-950">Destinos destacados</h2>
          <Link to="/explorar" className="text-sm font-medium text-green-800 underline">Ver todos</Link>
        </div>
        {loading ? (
          <p className="mt-6">Cargando destinos…</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {featured.slice(0, 2).map((d) => (
              <DestinationCard key={d.id} d={d} />
            ))}
          </div>
        )}
        </div>
        <TripWidget />
      </section>

      <section className="bg-[#efe6cf] py-12" aria-labelledby="como">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="como" className="text-2xl font-bold text-green-950">¿Qué te gusta hacer?</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {INTERESTS.map((i) => (
              <li key={i.id}>
                <Link
                  to={`/explorar?categoria=${i.id}`}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 font-medium text-green-950 shadow-sm hover:shadow-md"
                >
                  <span className="text-2xl" aria-hidden="true">{i.emoji}</span>
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
