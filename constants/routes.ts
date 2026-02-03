export const ROUTES = {
  // Auth
  LOGIN: "/login",
  REGISTER: "/register",
  // Agent
  AGENT: {
    LIVE_CALL: "/agent/live-call",
    POST_CALL: (sessionId: string) => `/agent/post-call/${sessionId}`,
    SOP: "/agent/sop",
    CHAT: "/agent/chat",
  },
  // Manager
  MANAGER: {
    OVERVIEW: "/manager/overview",
    AGENTS: "/manager/agents",
    SESSIONS: "/manager/sessions",
    SESSION_DETAIL: (sessionId: string) => `/manager/sessions/${sessionId}`,
    LIVE_MONITORING: "/manager/live-monitoring",
    FLOOR: "/manager/floor",
    INTELLIGENCE: "/manager/intelligence",
  },
  // Admin
  ADMIN: {
    ONBOARDING: "/admin/onboarding",
    ONBOARDING1: "/admin/new-onboarding",
    KNOWLEDGE: "/admin/knowledge",
    INTENTS: "/admin/intents",
    FEATURES: "/admin/features",
    DASHBOARD: "/admin/dashboard",
    AUTOMATION: "/admin/automation",
    DATA_RETENTION: "/admin/data-retention",
    AUDIT_LOGS: "/admin/audit-logs",
    CONFIGURATION: "/admin/configuration",
    USERS: "/admin/users",
  },
} as const;
