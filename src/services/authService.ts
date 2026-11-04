/**
 * Contrato de autenticación. Aún NO existe un servidor: ninguna operación crea cuentas ni sesiones.
 * Cuando haya backend, implementa estas funciones (p. ej. con fetch a /auth/login y /auth/register).
 */
export interface Credentials {
  email: string;
  password: string;
}
export interface RegisterData extends Credentials {
  name: string;
}

export const AUTH_AVAILABLE = false;

export async function login(_c: Credentials): Promise<never> {
  throw new Error('El servicio de autenticación aún no está conectado.');
}

export async function register(_d: RegisterData): Promise<never> {
  throw new Error('El servicio de autenticación aún no está conectado.');
}
