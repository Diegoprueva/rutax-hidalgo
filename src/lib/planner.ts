import type { Destination, Interest, OriginId, ZoneId } from '../types';
import {
  interZonePerPerson,
  localPerPersonPerDay,
  lodgingPerRoomNight,
  origins,
  roundTripPerPerson,
} from '../data/destinations';

export interface TripInput {
  budget: number;
  days: number;
  people: number;
  origin: OriginId;
  interests: Interest[];
}

export interface Stop {
  destination: Destination;
  activities: string[];
}

export interface DayPlan {
  day: number;
  zone: ZoneId;
  stops: Stop[];
  hours: number;
  costs: { entradas: number; alimentacion: number; transporteLocal: number };
}

export interface CostBreakdown {
  transporte: number;
  alimentacion: number;
  entradas: number;
  hospedaje: number;
  total: number;
}

export type LodgingTier = 'comodo' | 'economico';

export interface Itinerary {
  id: string;
  createdAt: string;
  input: TripInput;
  tier: LodgingTier;
  days: DayPlan[];
  nights: number;
  costs: CostBreakdown;
  withinBudget: boolean;
  notes: string[];
}

export interface Alternative {
  label: string;
  detail: string;
  patch: Partial<TripInput>;
}

export interface PlanResult {
  itinerary: Itinerary;
  alternatives: Alternative[];
}

const DAY_CAPACITY_HOURS = 8;
const MEALS_PER_DAY = 3;

function score(d: Destination, interests: Interest[]): number {
  if (interests.length === 0) return 1;
  return d.interests.filter((i) => interests.includes(i)).length;
}

/** Agrupa destinos por zona y los acomoda en días (máx. 8 h). Devuelve null si exceden los días disponibles. */
function pack(selected: Destination[], maxDays: number, interests: Interest[]): Destination[][] | null {
  const byZone = new Map<ZoneId, Destination[]>();
  selected.forEach((d) => byZone.set(d.zone, [...(byZone.get(d.zone) ?? []), d]));
  const zones = [...byZone.entries()].sort(
    (a, b) => b[1].reduce((s, d) => s + score(d, interests), 0) - a[1].reduce((s, d) => s + score(d, interests), 0),
  );
  const days: Destination[][] = [];
  for (const [, list] of zones) {
    const bins: Destination[][] = [];
    [...list].sort((a, b) => b.visitHours - a.visitHours).forEach((d) => {
      const bin = bins.find((b) => b.reduce((s, x) => s + x.visitHours, 0) + d.visitHours <= DAY_CAPACITY_HOURS);
      if (bin) bin.push(d);
      else bins.push([d]);
    });
    days.push(...bins);
  }
  return days.length <= maxDays ? days : null;
}

function activitiesFor(d: Destination, interests: Interest[]): string[] {
  const preferred = interests.length ? d.activities.filter((a) => interests.includes(a.interest)) : d.activities;
  return (preferred.length ? preferred : d.activities).slice(0, 3).map((a) => a.text);
}

function computeItinerary(
  input: TripInput,
  packed: Destination[][],
  tier: LodgingTier,
  notes: string[],
): Itinerary {
  const { people, origin, interests, budget } = input;
  const days: DayPlan[] = packed.map((list, i) => ({
    day: i + 1,
    zone: list[0].zone,
    stops: list.map((d) => ({ destination: d, activities: activitiesFor(d, interests) })),
    hours: list.reduce((s, d) => s + d.visitHours, 0),
    costs: {
      entradas: list.reduce((s, d) => s + d.entryFee, 0) * people,
      alimentacion: Math.round((list.reduce((s, d) => s + d.mealCost, 0) / list.length) * MEALS_PER_DAY) * people,
      transporteLocal: localPerPersonPerDay * people,
    },
  }));

  const zones = [...new Set(days.map((d) => d.zone))];
  const farthest = Math.max(...zones.map((z) => roundTripPerPerson[origin][z]));
  const transporte =
    (farthest + Math.max(0, zones.length - 1) * interZonePerPerson) * people +
    days.reduce((s, d) => s + d.costs.transporteLocal, 0);

  const nights = Math.max(0, days.length - 1);
  const rooms = Math.ceil(people / 2);
  const hospedaje = days.slice(0, nights).reduce((s, d) => s + lodgingPerRoomNight[d.zone][tier] * rooms, 0);

  const alimentacion = days.reduce((s, d) => s + d.costs.alimentacion, 0);
  const entradas = days.reduce((s, d) => s + d.costs.entradas, 0);
  const total = transporte + alimentacion + entradas + hospedaje;

  return {
    id: `trip-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    tier,
    days,
    nights,
    costs: { transporte, alimentacion, entradas, hospedaje, total },
    withinBudget: total <= budget,
    notes,
  };
}

function buildItinerary(input: TripInput, catalog: Destination[]): Itinerary {
  const matching = catalog.filter((d) => score(d, input.interests) > 0);
  const pool = (matching.length ? matching : catalog)
    .sort((a, b) => score(b, input.interests) - score(a, input.interests))
    .slice(0, 12);

  type Candidate = { itin: Itinerary; value: number; count: number };
  let best: Candidate | null = null;
  let cheapest: Candidate | null = null;
  let bestUnconstrained = 0;

  // El catálogo es pequeño: se evalúan todas las combinaciones de lugares.
  for (let mask = 1; mask < 1 << pool.length; mask++) {
    const subset = pool.filter((_, i) => mask & (1 << i));
    const packed = pack(subset, input.days, input.interests);
    if (!packed) continue;
    const value = subset.reduce((s, d) => s + score(d, input.interests), 0);
    bestUnconstrained = Math.max(bestUnconstrained, value);
    for (const tier of ['comodo', 'economico'] as LodgingTier[]) {
      const itin = computeItinerary(input, packed, tier, []);
      const cand = { itin, value, count: subset.length };
      if (!cheapest || itin.costs.total < cheapest.itin.costs.total) cheapest = cand;
      if (!itin.withinBudget) continue;
      const better =
        !best ||
        value > best.value ||
        (value === best.value && (tier === 'comodo') > (best.itin.tier === 'comodo')) ||
        (value === best.value && tier === best.itin.tier && itin.costs.total < best.itin.costs.total);
      if (better) best = cand;
    }
  }

  const chosen = (best ?? cheapest) as Candidate;
  const notes: string[] = [];
  if (best && chosen.itin.tier === 'economico' && chosen.itin.nights > 0) {
    notes.push('Para ajustarse a tu presupuesto se eligió hospedaje económico.');
  }
  if (best && chosen.value < bestUnconstrained) {
    notes.push('Se dejaron fuera algunos lugares que coinciden con tus intereses para respetar tu presupuesto.');
  }
  if (!best) notes.push('Se muestra la combinación más económica disponible; excede tu presupuesto.');
  if (chosen.itin.days.length < input.days) {
    notes.push(
      `Con tu presupuesto y el catálogo de demostración se armaron ${chosen.itin.days.length} día(s) de los ${input.days} solicitados; el resto queda libre.`,
    );
  }
  return { ...chosen.itin, notes };
}

function fits(input: TripInput, catalog: Destination[]) {
  return buildItinerary(input, catalog).withinBudget;
}

export function generateItinerary(input: TripInput, catalog: Destination[]): PlanResult {
  const itinerary = buildItinerary(input, catalog);
  const alternatives: Alternative[] = [];

  if (!itinerary.withinBudget) {
    const money = (n: number) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
    alternatives.push({
      label: 'Aumentar presupuesto',
      detail: `La opción más económica que encontramos cuesta aprox. ${money(itinerary.costs.total)} (estimado de demostración).`,
      patch: { budget: Math.ceil(itinerary.costs.total / 100) * 100 },
    });
    for (let d = input.days - 1; d >= 1; d--) {
      if (fits({ ...input, days: d }, catalog)) {
        alternatives.push({ label: `Viaje de ${d} día(s)`, detail: 'Con menos días tu presupuesto sí alcanza.', patch: { days: d } });
        break;
      }
    }
    for (let p = input.people - 1; p >= 1; p--) {
      if (fits({ ...input, people: p }, catalog)) {
        alternatives.push({ label: `Viajar ${p} persona(s)`, detail: 'Con menos personas el presupuesto alcanza.', patch: { people: p } });
        break;
      }
    }
    origins
      .filter((o) => o.id !== input.origin)
      .map((o) => ({ o, total: buildItinerary({ ...input, origin: o.id }, catalog) }))
      .filter((x) => x.total.withinBudget)
      .slice(0, 1)
      .forEach(({ o }) =>
        alternatives.push({ label: `Salir desde ${o.label}`, detail: 'El traslado sería más económico.', patch: { origin: o.id } }),
      );
  }
  return { itinerary, alternatives };
}

export function validateTrip(input: Partial<Record<keyof TripInput, unknown>>): Record<string, string> {
  const errors: Record<string, string> = {};
  const budget = Number(input.budget);
  const days = Number(input.days);
  const people = Number(input.people);
  if (!Number.isFinite(budget) || budget <= 0) errors.budget = 'Ingresa un presupuesto mayor a 0.';
  if (!Number.isInteger(days) || days < 1 || days > 14) errors.days = 'Elige entre 1 y 14 días.';
  if (!Number.isInteger(people) || people < 1 || people > 20) errors.people = 'Elige entre 1 y 20 personas.';
  if (!input.origin) errors.origin = 'Selecciona tu punto de partida.';
  if (!Array.isArray(input.interests) || input.interests.length === 0) errors.interests = 'Elige al menos un interés.';
  return errors;
}

export function formatMXN(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
}

export function itineraryToText(it: Itinerary, originLabel: string): string {
  const lines = [
    'RutaX Hidalgo — Mi itinerario',
    `Salida desde: ${originLabel} | ${it.input.days} día(s) | ${it.input.people} persona(s) | Presupuesto: ${formatMXN(it.input.budget)}`,
    'AVISO: datos de demostración; confirma precios y horarios con fuentes oficiales.',
    '',
  ];
  it.days.forEach((d) => {
    lines.push(`Día ${d.day}`);
    d.stops.forEach((s) => {
      lines.push(`  • ${s.destination.name} (${s.destination.municipality})`);
      s.activities.forEach((a) => lines.push(`      - ${a}`));
    });
  });
  lines.push(
    '',
    'Gastos estimados',
    `  Transporte: ${formatMXN(it.costs.transporte)}`,
    `  Alimentación: ${formatMXN(it.costs.alimentacion)}`,
    `  Entradas: ${formatMXN(it.costs.entradas)}`,
    `  Hospedaje: ${formatMXN(it.costs.hospedaje)}`,
    `  TOTAL: ${formatMXN(it.costs.total)}`,
  );
  return lines.join('\n');
}

