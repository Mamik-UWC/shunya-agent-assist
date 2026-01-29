import type { User } from "@/types/auth";

export function checkPermission(user: User, permission: string): boolean {
  // Basic RBAC implementation
  // This should be expanded based on actual permission structure
  const userPermissions = user.permissions || [];
  const userRole = user.role;

  // Check direct permissions
  if (userPermissions.includes(permission)) {
    return true;
  }

  // Check role-based permissions
  const rolePermissions: Record<string, string[]> = {
    admin: ["admin", "manager", "agent", "view_agents", "view_sessions", "view_analytics", "live_monitoring", "view_audit_logs", "manage_tenants", "manage_users", "manage_knowledge", "manage_intents", "manage_features", "manage_dashboards", "manage_automation", "manage_data_retention"],
    manager: ["manager", "agent", "view_agents", "view_sessions", "view_analytics", "live_monitoring"],
    agent: ["agent", "view_calls", "view_sop", "use_chat_assistant"],
  };

  const rolePerms = rolePermissions[userRole] || [];
  return rolePerms.includes(permission);
}

export function hasRole(user: User, role: string): boolean {
  return user.role === role;
}
