import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <Link to="/" className="mt-4 inline-block underline">Ir al inicio</Link>
    </div>
  );
}
