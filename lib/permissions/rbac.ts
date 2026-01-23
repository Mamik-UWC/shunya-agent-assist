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
    admin: ["admin", "manager", "agent"],
    manager: ["manager", "agent"],
    agent: ["agent"],
  };

  const rolePerms = rolePermissions[userRole] || [];
  return rolePerms.includes(permission);
}

export function hasRole(user: User, role: string): boolean {
  return user.role === role;
}
