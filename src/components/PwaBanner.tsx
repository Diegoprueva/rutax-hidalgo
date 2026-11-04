import { usePwaController } from '../controllers/pwaController';

export function PwaBanner() {
  const { canInstall, install, online, updateAvailable, applyUpdate } = usePwaController();
  if (online && !canInstall && !updateAvailable) return null;
  return (
    <div className="no-print bg-green-900 px-4 py-2 text-sm text-white" role="status" aria-live="polite">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
        <span>
          {!online
            ? 'Sin conexión: puedes ver lo que ya cargaste, tus favoritos y tu itinerario.'
            : updateAvailable
              ? 'Hay una nueva versión disponible.'
              : 'Instala RutaX Hidalgo en tu dispositivo.'}
        </span>
        {online && (updateAvailable || canInstall) && (
          <button type="button" onClick={updateAvailable ? applyUpdate : install} className="rounded-md bg-[#f3e9cf] px-3 py-1 font-semibold text-green-950 hover:bg-white">
            {updateAvailable ? 'Actualizar' : 'Instalar'}
          </button>
        )}
      </div>
    </div>
  );
}
