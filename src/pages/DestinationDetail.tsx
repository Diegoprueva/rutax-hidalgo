import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DestinationImage } from '../components/DestinationImage';
import { FavoriteButton } from '../components/DestinationCard';
import { INTERESTS } from '../types';
import { zoneNames } from '../data/destinations';
import { formatMXN } from '../lib/planner';

export function DestinationDetail() {
  const { id } = useParams();
  const { destinations, loading } = useApp();
  const d = destinations.find((x) => x.id === id);

  if (loading) return <p className="mx-auto max-w-6xl px-4 py-10">Cargando…</p>;
  if (!d)
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold">Destino no encontrado</h1>
        <Link to="/explorar" className="mt-4 inline-block underline">Volver a explorar</Link>
      </div>
    );

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.mapQuery)}`;
  const interestLabels = d.interests.map((i) => INTERESTS.find((x) => x.id === i)!.label);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link to="/explorar" className="text-sm text-green-800 underline">← Volver a explorar</Link>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <DestinationImage destination={d} variant={0} className="h-64 w-full rounded-2xl sm:col-span-2 sm:row-span-2 sm:h-full" />
        <DestinationImage destination={d} variant={1} className="hidden h-32 w-full rounded-2xl sm:block" />
        <DestinationImage destination={d} variant={2} className="hidden h-32 w-full rounded-2xl sm:block" />
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-stone-600">{d.municipality} · {zoneNames[d.zone]}</p>
          <h1 className="text-3xl font-bold text-green-950">{d.name}</h1>
          <p className="mt-1 text-lg text-stone-700">{d.tagline}</p>
        </div>
        <div className="rounded-full border border-stone-300">
          <FavoriteButton id={d.id} name={d.name} />
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section aria-labelledby="desc">
            <h2 id="desc" className="text-xl font-semibold">Descripción</h2>
            <p className="mt-2 leading-relaxed text-stone-800">{d.description}</p>
            <p className="mt-2 text-sm text-stone-600">Ideal para: {interestLabels.join(', ')}.</p>
          </section>
          <section aria-labelledby="act">
            <h2 id="act" className="text-xl font-semibold">Actividades sugeridas</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {d.activities.map((a) => (
                <li key={a.text}>{a.text}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="rec">
            <h2 id="rec" className="text-xl font-semibold">Recomendaciones</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {d.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl bg-white p-5 shadow-sm" aria-label="Información práctica">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-semibold">Ubicación</dt>
              <dd>{d.municipality}, Hidalgo · <a href={mapUrl} target="_blank" rel="noreferrer" className="text-green-800 underline">Ver en el mapa</a></dd>
            </div>
            <div>
              <dt className="font-semibold">Horario</dt>
              <dd>{d.schedule ?? 'No verificado. Consulta el horario oficial antes de ir.'}</dd>
            </div>
            <div>
              <dt className="font-semibold">Entrada (estimado)</dt>
              <dd>{d.entryFee === 0 ? 'Sin costo estimado' : `${formatMXN(d.entryFee)} por persona`}</dd>
            </div>
            <div>
              <dt className="font-semibold">Comida (estimado)</dt>
              <dd>{formatMXN(d.mealCost)} por persona</dd>
            </div>
            <div>
              <dt className="font-semibold">Tiempo sugerido</dt>
              <dd>~{d.visitHours} horas</dd>
            </div>
          </dl>
          <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
            {d.verified ? 'Información verificada.' : 'Datos de demostración sin verificar.'} Fuente: {d.source}.
          </p>
          <Link to="/planificador" state={{ interests: d.interests }} className="block rounded-xl bg-green-800 px-4 py-3 text-center font-semibold text-white hover:bg-green-900">
            Planear un viaje con intereses similares
          </Link>
        </aside>
      </div>
    </div>
  );
}
