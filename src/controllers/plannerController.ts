import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Destination, Interest, OriginId } from '../types';
import { generateItinerary, validateTrip, type Itinerary, type PlanResult, type TripInput } from '../lib/planner';

/** Controlador 4: formulario del planificador, validación y generación. */
export function usePlannerController(
  destinations: Destination[],
  saved: Itinerary | null,
  setItinerary: (it: Itinerary | null) => void,
  presetInterests?: Interest[],
) {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(String(saved?.input.budget ?? 3000));
  const [days, setDays] = useState(String(saved?.input.days ?? 2));
  const [people, setPeople] = useState(String(saved?.input.people ?? 2));
  const [origin, setOrigin] = useState<OriginId | ''>(saved?.input.origin ?? '');
  const [interests, setInterests] = useState<Interest[]>(presetInterests ?? saved?.input.interests ?? []);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<PlanResult | null>(null);

  const toggleInterest = (i: Interest) => setInterests((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));

  const run = (input: TripInput) => {
    const res = generateItinerary(input, destinations);
    setItinerary(res.itinerary);
    if (res.itinerary.withinBudget) navigate('/itinerario');
    else setResult(res);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateTrip({ budget, days, people, origin, interests });
    setErrors(errs);
    setResult(null);
    if (Object.keys(errs).length) {
      document.getElementById('resumen-errores')?.focus();
      return;
    }
    run({ budget: Number(budget), days: Number(days), people: Number(people), origin: origin as OriginId, interests });
  };

  const applyAlternative = (patch: Partial<TripInput>) => {
    const next = { budget: Number(budget), days: Number(days), people: Number(people), origin: origin as OriginId, interests, ...patch };
    setBudget(String(next.budget));
    setDays(String(next.days));
    setPeople(String(next.people));
    setOrigin(next.origin);
    setResult(null);
    run(next);
  };

  return {
    budget, setBudget, days, setDays, people, setPeople, origin, setOrigin,
    interests, toggleInterest, errors, result, submit, applyAlternative,
  };
}
