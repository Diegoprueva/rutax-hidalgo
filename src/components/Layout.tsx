import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { DATA_DISCLAIMER } from '../data/destinations';
import { PwaBanner } from './PwaBanner';

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/explorar', label: 'Explorar' },
  { to: '/planificador', label: 'Planificador' },
  { to: '/itinerario', label: 'Mi itinerario' },
  { to: '/favoritos', label: 'Favoritos' },
  { to: '/cuenta', label: 'Mi cuenta' },
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const { favorites } = useApp();
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    document.getElementById('contenido')?.focus({ preventScroll: true });
  }, [pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-green-800 text-white' : 'text-green-950 hover:bg-green-100'}`;

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">
        Saltar al contenido
      </a>
      <PwaBanner />
      <header className="no-print sticky top-0 z-40 border-b border-stone-200 bg-[#fbf7ec]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-green-900">
            <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="#166534" />
              <path d="M4 24l9-14 5 8 3-4 7 10z" fill="#f5efe0" />
            </svg>
            RutaX <span className="font-light">Hidalgo</span>
          </Link>
          <button
            type="button"
            className="rounded-lg border border-green-800 px-3 py-2 text-sm font-medium text-green-900 md:hidden"
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Cerrar' : 'Menú'}
          </button>
          <nav
            id="menu-principal"
            aria-label="Principal"
            className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-1 border-b border-stone-200 bg-[#fbf7ec] p-3 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0`}
          >
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
                {l.to === '/favoritos' && favorites.length > 0 && (
                  <span className="ml-1 rounded-full bg-rose-700 px-1.5 text-xs text-white" aria-label={`${favorites.length} guardados`}>
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="contenido" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <footer className="no-print bg-green-950 px-4 py-8 text-sm text-green-50">
        <div className="mx-auto max-w-6xl">
          <p className="font-semibold">RutaX Hidalgo</p>
          <p className="mt-2 max-w-3xl text-green-100">{DATA_DISCLAIMER}</p>
        </div>
      </footer>
    </div>
  );
}
