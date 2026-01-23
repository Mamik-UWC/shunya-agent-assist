export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REGISTER: "/api/auth/register",
    REFRESH: "/api/auth/refresh",
  },
  // Sessions
  SESSIONS: {
    LIST: "/api/sessions",
    GET: (id: string) => `/api/sessions/${id}`,
    CREATE: "/api/sessions",
    UPDATE: (id: string) => `/api/sessions/${id}`,
    DELETE: (id: string) => `/api/sessions/${id}`,
  },
  // Realtime
  REALTIME: {
    CONNECT: "/api/realtime/connect",
    DISCONNECT: "/api/realtime/disconnect",
  },
} as const;
