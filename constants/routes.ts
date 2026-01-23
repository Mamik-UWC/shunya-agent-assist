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
    INTELLIGENCE: "/manager/intelligence",
  },
  // Admin
  ADMIN: {
    ONBOARDING: "/admin/onboarding",
    KNOWLEDGE: "/admin/knowledge",
    INTENTS: "/admin/intents",
    FEATURES: "/admin/features",
    DASHBOARDS: "/admin/dashboards",
    AUTOMATION: "/admin/automation",
    DATA_RETENTION: "/admin/data-retention",
    AUDIT_LOGS: "/admin/audit-logs",
  },
} as const;
