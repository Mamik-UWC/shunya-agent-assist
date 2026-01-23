import { useTenantStore } from "@/stores/tenant.store";

export function useTenant() {
  const tenant = useTenantStore((state) => state.tenant);
  return tenant;
}
