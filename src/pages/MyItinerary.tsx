import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DestinationImage } from '../components/DestinationImage';
import { origins, zoneNames, DATA_DISCLAIMER } from '../data/destinations';
import { formatMXN } from '../lib/planner';

export function MyItinerary() {
  const { itinerary: it, printItinerary, downloadItinerary, clearItinerary } = useApp();

  if (!it)
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-green-950">Mi itinerario</h1>
        <p className="mt-3">Todavía no has generado un itinerario.</p>
        <Link to="/planificador" className="mt-5 inline-block rounded-xl bg-green-800 px-6 py-3 font-semibold text-white">Ir al planificador</Link>
      </div>
    );

  const originLabel = origins.find((o) => o.id === it.input.origin)?.label ?? '';
  const rows: [string, number][] = [
    ['Transporte (ida/vuelta y local)', it.costs.transporte],
    ['Alimentación (3 comidas al día)', it.costs.alimentacion],
    ['Entradas', it.costs.entradas],
    [`Hospedaje (${it.nights} noche(s), ${it.tier === 'comodo' ? 'confort' : 'económico'})`, it.costs.hospedaje],
  ];
  const diff = it.input.budget - it.costs.total;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-green-950">Mi itinerario</h1>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={printItinerary} className="rounded-lg bg-green-800 px-4 py-2 font-medium text-white hover:bg-green-900">Imprimir / guardar PDF</button>
          <button type="button" onClick={downloadItinerary} className="rounded-lg border border-green-800 px-4 py-2 font-medium text-green-900 hover:bg-green-50">Descargar .txt</button>
          <Link to="/planificador" className="rounded-lg border border-stone-400 px-4 py-2 font-medium hover:bg-stone-100">Editar viaje</Link>
          <button
            type="button"
            onClick={clearItinerary}
            className="rounded-lg border border-red-700 px-4 py-2 font-medium text-red-800 hover:bg-red-50"
          >
            Eliminar
          </button>
        </div>
      </div>
      <p className="hidden text-2xl font-bold print:block">RutaX Hidalgo — Mi itinerario</p>
      <p className="mt-2 text-stone-700">
        Desde {originLabel} · {it.days.length} día(s) · {it.input.people} persona(s) · Presupuesto {formatMXN(it.input.budget)}
      </p>

      {!it.withinBudget && (
        <p role="alert" className="mt-4 rounded-lg border border-amber-400 bg-amber-50 p-3 text-amber-950">
          Este itinerario excede tu presupuesto por {formatMXN(-diff)}. Ajusta tu viaje en el <Link to="/planificador" className="underline">planificador</Link> para ver alternativas.
        </p>
      )}
      {it.notes.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 rounded-lg bg-white p-4 pl-8 text-sm">
          {it.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}

      <ol className="mt-6 space-y-6">
        {it.days.map((d) => (
          <li key={d.day} className="print-card rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-green-900">Día {d.day} <span className="text-base font-normal text-stone-600">· {zoneNames[d.zone]} · ~{d.hours} h de visita</span></h2>
            <ul className="mt-4 space-y-4">
              {d.stops.map((s) => (
                <li key={s.destination.id} className="flex gap-4">
                  <DestinationImage destination={s.destination} className="no-print hidden h-24 w-32 shrink-0 rounded-xl sm:block" />
                  <div>
                    <h3 className="font-semibold">
                      <Link to={`/destino/${s.destination.id}`} className="hover:underline">{s.destination.name}</Link>
                    </h3>
                    <ul className="mt-1 list-disc pl-5 text-sm text-stone-800">
                      {s.activities.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-stone-700">
              Día: entradas {formatMXN(d.costs.entradas)} · comida {formatMXN(d.costs.alimentacion)} · transporte local {formatMXN(d.costs.transporteLocal)}
            </p>
          </li>
        ))}
      </ol>

      <section className="print-card mt-8 rounded-2xl bg-white p-5 shadow-sm" aria-labelledby="gastos">
        <h2 id="gastos" className="text-xl font-bold">Gastos estimados</h2>
        <table className="mt-3 w-full text-left text-sm">
          <caption className="sr-only">Desglose de gastos estimados</caption>
          <tbody>
            {rows.map(([label, v]) => (
              <tr key={label} className="border-b border-stone-200">
                <th scope="row" className="py-2 font-normal">{label}</th>
                <td className="py-2 text-right">{formatMXN(v)}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <th scope="row" className="py-2">Total</th>
              <td className="py-2 text-right">{formatMXN(it.costs.total)}</td>
            </tr>
            <tr>
              <th scope="row" className="py-2 font-normal">{diff >= 0 ? 'Te sobra' : 'Te falta'}</th>
              <td className={`py-2 text-right ${diff >= 0 ? 'text-green-800' : 'text-red-800'}`}>{formatMXN(Math.abs(diff))}</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-xs text-stone-600">{DATA_DISCLAIMER}</p>
      </section>
    </div>
  );
}
