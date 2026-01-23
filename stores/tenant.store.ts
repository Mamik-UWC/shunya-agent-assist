import { create } from "zustand";
import type { TenantConfig } from "@/types/tenant";

interface TenantState {
  tenant: TenantConfig | null;
  setTenant: (tenant: TenantConfig) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  tenant: null,
  setTenant: (tenant) => set({ tenant }),
}));
