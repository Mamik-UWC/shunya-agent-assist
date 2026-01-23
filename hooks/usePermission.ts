import { useAuthStore } from "@/stores/auth.store";
import { checkPermission } from "@/lib/permissions/rbac";

export function usePermission(permission: string): boolean {
  const user = useAuthStore((state) => state.user);
  if (!user) return false;
  return checkPermission(user, permission);
}
