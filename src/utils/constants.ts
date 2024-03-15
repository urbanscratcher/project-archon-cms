export const NODE_ENV = import.meta.env.NODE_ENV ?? 'development';
export const PORT = import.meta.env.VITE_PORT ?? 5173;
export const ORIGIN = import.meta.env.VITE_ORIGIN ?? '';

export const AES_SECRET = import.meta.env.VITE_AES_SECRET ?? '';

export const JWT_ACCESS_SECRET = import.meta.env.VITE_JWT_ACCESS_SECRET ?? '';
export const JWT_REFRESH_SECRET = import.meta.env.VITE_JWT_REFRESH_SECRET ?? '';

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL ?? 'https://placidgull.com/archon-api/v1';
