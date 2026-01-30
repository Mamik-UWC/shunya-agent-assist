import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RetentionPolicy } from '@/features/configuration/types';
import type { Version } from '@/components/layout/VersionHistoryPanel';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';

interface RetentionPoliciesState {
    policies: RetentionPolicy[];
    versions: Version[];
    auditEntries: AuditTrailEntry[];
    setPolicies: (policies: RetentionPolicy[]) => void;
    setVersions: (versions: Version[]) => void;
    setAuditEntries: (entries: AuditTrailEntry[]) => void;
    addPolicy: (policy: RetentionPolicy) => void;
    updatePolicy: (id: string, policy: Partial<RetentionPolicy>) => void;
    deletePolicy: (id: string) => void;
    togglePolicy: (id: string, enabled: boolean) => void;
    getEnabledPolicies: () => RetentionPolicy[];
    getPolicyByDataType: (dataType: string) => RetentionPolicy | undefined;
}

export const useRetentionPolicies = create<RetentionPoliciesState>()(
    persist(
        (set, get) => ({
            policies: [],
            versions: [],
            auditEntries: [],
            setPolicies: (policies) => set({ policies }),
            setVersions: (versions) => set({ versions }),
            setAuditEntries: (entries) => set({ auditEntries: entries }),
            addPolicy: (policy) =>
                set((state) => ({ policies: [...state.policies, policy] })),
            updatePolicy: (id, policy) =>
                set((state) => ({
                    policies: state.policies.map((p) =>
                        p.id === id ? { ...p, ...policy } : p
                    ),
                })),
            deletePolicy: (id) =>
                set((state) => ({
                    policies: state.policies.filter((p) => p.id !== id),
                })),
            togglePolicy: (id, enabled) =>
                set((state) => ({
                    policies: state.policies.map((p) =>
                        p.id === id ? { ...p, enabled } : p
                    ),
                })),
            getEnabledPolicies: () => get().policies.filter((p) => p.enabled),
            getPolicyByDataType: (dataType) =>
                get().policies.find((p) => p.dataType === dataType),
        }),
        {
            name: 'retention-policies-storage',
        }
    )
);
