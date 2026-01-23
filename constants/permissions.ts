export const PERMISSIONS = {
  // Agent permissions
  AGENT: "agent",
  VIEW_CALLS: "view_calls",
  VIEW_SOP: "view_sop",
  USE_CHAT_ASSISTANT: "use_chat_assistant",
  
  // Manager permissions
  MANAGER: "manager",
  VIEW_AGENTS: "view_agents",
  VIEW_SESSIONS: "view_sessions",
  VIEW_ANALYTICS: "view_analytics",
  LIVE_MONITORING: "live_monitoring",
  
  // Admin permissions
  ADMIN: "admin",
  MANAGE_TENANTS: "manage_tenants",
  MANAGE_USERS: "manage_users",
  MANAGE_KNOWLEDGE: "manage_knowledge",
  MANAGE_INTENTS: "manage_intents",
  MANAGE_FEATURES: "manage_features",
  MANAGE_DASHBOARDS: "manage_dashboards",
  MANAGE_AUTOMATION: "manage_automation",
  MANAGE_DATA_RETENTION: "manage_data_retention",
  VIEW_AUDIT_LOGS: "view_audit_logs",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
