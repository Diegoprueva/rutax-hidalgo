import { useState, type FormEvent } from 'react';
import { AUTH_AVAILABLE, login, register } from '../services/authService';

type Mode = 'login' | 'register';

export function Account() {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (mode === 'register' && name.trim().length < 2) errs.name = 'Ingresa tu nombre.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Ingresa un correo válido.';
    if (password.length < 8) errs.password = 'La contraseña debe tener al menos 8 caracteres.';
    setErrors(errs);
    setMessage('');
    if (Object.keys(errs).length) return;
    try {
      if (mode === 'login') await login({ email, password });
      else await register({ name, email, password });
    } catch (error) {
      setMessage((error as Error).message + ' No se creó ninguna cuenta ni sesión; tus favoritos e itinerario se guardan solo en este navegador.');
    }
  };

  const field = 'mt-1 w-full rounded-lg border border-stone-400 bg-white px-3 py-2';
  const err = (k: string) => (errors[k] ? <span id={`err-${k}`} className="mt-1 block text-sm font-medium text-red-800">{errors[k]}</span> : null);
  const a11y = (k: string) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `err-${k}` : undefined });

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-3xl font-bold text-green-950">Mi cuenta</h1>
      {!AUTH_AVAILABLE && (
        <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-950">
          El acceso con cuenta estará disponible cuando se conecte el servidor. Por ahora el formulario solo valida los datos.
        </p>
      )}
      <div className="mt-5 flex gap-2" role="group" aria-label="Tipo de formulario">
        {(['login', 'register'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => { setMode(m); setErrors({}); setMessage(''); }}
            className={`flex-1 rounded-lg px-4 py-2 font-medium ${mode === m ? 'bg-green-800 text-white' : 'border border-stone-400 bg-white'}`}
          >
            {m === 'login' ? 'Iniciar sesión' : 'Registrarme'}
          </button>
        ))}
      </div>
      <form onSubmit={submit} noValidate className="mt-4 space-y-4 rounded-2xl bg-white p-5 shadow-sm">
        {mode === 'register' && (
          <label className="block text-sm font-medium">
            Nombre
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} {...a11y('name')} />
            {err('name')}
          </label>
        )}
        <label className="block text-sm font-medium">
          Correo electrónico
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={field} {...a11y('email')} />
          {err('email')}
        </label>
        <label className="block text-sm font-medium">
          Contraseña
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} className={field} {...a11y('password')} />
          {err('password')}
        </label>
        <button type="submit" className="w-full rounded-xl bg-green-800 px-6 py-3 font-semibold text-white hover:bg-green-900">
          {mode === 'login' ? 'Entrar' : 'Crear cuenta'}
        </button>
        {message && <p role="alert" className="rounded-lg bg-stone-100 p-3 text-sm">{message}</p>}
      </form>
    </div>
  );
}
