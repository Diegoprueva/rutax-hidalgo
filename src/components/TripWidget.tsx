import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatMXN } from '../lib/planner';
import { origins } from '../data/destinations';

/** Widget "Mi viaje": resumen del itinerario guardado y uso del presupuesto. */
export function TripWidget() {
  const { itinerary: it, favorites } = useApp();
  const pct = it ? Math.min(100, Math.round((it.costs.total / it.input.budget) * 100)) : 0;
  const origin = it ? origins.find((o) => o.id === it.input.origin)?.label : '';

  return (
    <section aria-labelledby="widget-viaje" className="rounded-2xl border border-green-200 bg-white p-5 shadow-sm">
      <h2 id="widget-viaje" className="text-lg font-bold text-green-950">Mi viaje</h2>
      {it ? (
        <>
          <p className="mt-1 text-sm text-stone-700">
            {it.days.length} día(s) · {it.input.people} persona(s) · desde {origin}
          </p>
          <p className="mt-3 text-sm">
            Gasto estimado <strong>{formatMXN(it.costs.total)}</strong> de {formatMXN(it.input.budget)}
          </p>
          <div
            role="progressbar"
            aria-label="Presupuesto utilizado"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            className="mt-2 h-3 overflow-hidden rounded-full bg-stone-200"
          >
            <div className={`h-full ${it.withinBudget ? 'bg-green-700' : 'bg-red-700'}`} style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-1 text-xs text-stone-600">{pct}% del presupuesto{it.withinBudget ? '' : ' (excedido)'}</p>
          <Link to="/itinerario" className="mt-4 inline-block rounded-lg bg-green-800 px-4 py-2 text-sm font-semibold text-white hover:bg-green-900">
            Ver itinerario
          </Link>
        </>
      ) : (
        <>
          <p className="mt-1 text-sm text-stone-700">Aún no tienes un viaje planeado.</p>
          <Link to="/planificador" className="mt-4 inline-block rounded-lg bg-green-800 px-4 py-2 text-sm font-semibold text-white hover:bg-green-900">
            Crear mi viaje
          </Link>
        </>
      )}
      <p className="mt-4 text-sm text-stone-700">
        <Link to="/favoritos" className="underline">{favorites.length} favorito(s) guardado(s)</Link>
      </p>
    </section>
  );
}
