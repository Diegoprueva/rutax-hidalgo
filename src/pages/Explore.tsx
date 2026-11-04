import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useExploreController } from '../controllers/exploreController';
import { DestinationCard } from '../components/DestinationCard';
import { INTERESTS, type Interest } from '../types';

const budgetOptions = [
  { value: '', label: 'Cualquiera' },
  { value: '200', label: 'Hasta $200' },
  { value: '300', label: 'Hasta $300' },
  { value: '450', label: 'Hasta $450' },
];

export function Explore() {
  const { destinations, loading } = useApp();
  const [params] = useSearchParams();
  const { q, setQ, municipality, setMunicipality, category, setCategory, maxCost, setMaxCost, municipalities, results, clear } =
    useExploreController(destinations, params.get('categoria'));

  const field = 'mt-1 w-full rounded-lg border border-stone-400 bg-white px-3 py-2';
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-green-950">Explorar destinos</h1>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-6 grid gap-4 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-medium sm:col-span-2 lg:col-span-4">
          Buscar
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ej. Huasca, termales, bosque…" className={field} />
        </label>
        <label className="text-sm font-medium">
          Municipio
          <select value={municipality} onChange={(e) => setMunicipality(e.target.value)} className={field}>
            <option value="">Todos</option>
            {municipalities.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Categoría
          <select value={category} onChange={(e) => setCategory(e.target.value as Interest | '')} className={field}>
            <option value="">Todas</option>
            {INTERESTS.map((i) => (
              <option key={i.id} value={i.id}>{i.label}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Costo por persona (entrada + 1 comida, estimado)
          <select value={maxCost} onChange={(e) => setMaxCost(e.target.value)} className={field}>
            {budgetOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <button type="button" onClick={clear} className="w-full rounded-lg border border-green-800 px-4 py-2 font-medium text-green-900 hover:bg-green-50">
            Limpiar filtros
          </button>
        </div>
      </form>

      <p className="mt-6 text-stone-700" role="status" aria-live="polite">
        {loading ? 'Cargando…' : `${results.length} destino(s) encontrado(s)`}
      </p>
      {results.length === 0 && !loading ? (
        <p className="mt-4 rounded-xl bg-white p-6">No hay resultados. Prueba con otros filtros.</p>
      ) : (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((d) => (
            <DestinationCard key={d.id} d={d} />
          ))}
        </div>
      )}
    </div>
  );
}
