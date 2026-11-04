import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { INTERESTS, type Interest, type OriginId } from '../types';
import { usePlannerController } from '../controllers/plannerController';
import { origins } from '../data/destinations';
import { formatMXN } from '../lib/planner';

export function Planner() {
  const { destinations, itinerary, setItinerary } = useApp();
  const location = useLocation();
  const preset = (location.state as { interests?: Interest[] } | null)?.interests;
  const { budget, setBudget, days, setDays, people, setPeople, origin, setOrigin, interests, toggleInterest: toggle, errors, result, submit, applyAlternative } =
    usePlannerController(destinations, itinerary, setItinerary, preset);
  const field = 'mt-1 w-full rounded-lg border border-stone-400 bg-white px-3 py-2';
  const err = (k: string) =>
    errors[k] ? (
      <span id={`err-${k}`} className="mt-1 block text-sm font-medium text-red-800">{errors[k]}</span>
    ) : null;
  const a11y = (k: string) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `err-${k}` : undefined });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-green-950">Planificador de viajes</h1>
      <p className="mt-2 text-stone-700">Cuéntanos tu viaje y generaremos una propuesta con gastos aproximados.</p>

      <form onSubmit={submit} noValidate className="mt-6 space-y-5 rounded-2xl bg-white p-5 shadow-sm">
        {Object.keys(errors).length > 0 && (
          <div id="resumen-errores" tabIndex={-1} role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900">
            Revisa los campos marcados antes de continuar.
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-3">
          <label className="text-sm font-medium">
            Presupuesto total (MXN)
            <input type="number" inputMode="numeric" min="1" value={budget} onChange={(e) => setBudget(e.target.value)} className={field} {...a11y('budget')} />
            {err('budget')}
          </label>
          <label className="text-sm font-medium">
            Días
            <input type="number" min="1" max="14" value={days} onChange={(e) => setDays(e.target.value)} className={field} {...a11y('days')} />
            {err('days')}
          </label>
          <label className="text-sm font-medium">
            Personas
            <input type="number" min="1" max="20" value={people} onChange={(e) => setPeople(e.target.value)} className={field} {...a11y('people')} />
            {err('people')}
          </label>
        </div>
        <label className="block text-sm font-medium">
          Punto de partida
          <select value={origin} onChange={(e) => setOrigin(e.target.value as OriginId)} className={field} {...a11y('origin')}>
            <option value="">Selecciona…</option>
            {origins.map((o) => (
              <option key={o.id} value={o.id}>{o.label}</option>
            ))}
          </select>
          {err('origin')}
        </label>
        <fieldset aria-describedby={errors.interests ? 'err-interests' : undefined}>
          <legend className="text-sm font-medium">Intereses (elige uno o más)</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {INTERESTS.map((i) => {
              const on = interests.includes(i.id);
              return (
                <label
                  key={i.id}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-blue-700 ${on ? 'border-green-800 bg-green-800 text-white' : 'border-stone-400 bg-white text-stone-900'}`}
                >
                  <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(i.id)} />
                  <span aria-hidden="true">{i.emoji} </span>
                  {i.label}
                </label>
              );
            })}
          </div>
          {err('interests')}
        </fieldset>
        <button type="submit" className="w-full rounded-xl bg-green-800 px-6 py-3 font-semibold text-white hover:bg-green-900 sm:w-auto">
          Generar itinerario
        </button>
      </form>

      {result && (
        <section className="mt-8 rounded-2xl border border-amber-400 bg-amber-50 p-5" aria-labelledby="insuf" role="alert">
          <h2 id="insuf" className="text-xl font-bold text-amber-950">Tu presupuesto no alcanza para este viaje</h2>
          <p className="mt-2 text-amber-950">
            La propuesta más económica que encontramos cuesta aprox. <strong>{formatMXN(result.itinerary.costs.total)}</strong> y tu presupuesto es {formatMXN(Number(budget))}.
            Son estimaciones de demostración.
          </p>
          {result.alternatives.length > 0 && (
            <>
              <h3 className="mt-4 font-semibold">Alternativas</h3>
              <ul className="mt-2 space-y-2">
                {result.alternatives.map((a) => (
                  <li key={a.label} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white p-3">
                    <span><strong>{a.label}.</strong> {a.detail}</span>
                    <button type="button" onClick={() => applyAlternative(a.patch)} className="rounded-lg bg-green-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-900">
                      Aplicar
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Link to="/itinerario" className="mt-4 inline-block font-medium text-green-900 underline">
            Ver de todos modos la opción más económica
          </Link>
        </section>
      )}
    </div>
  );
}
