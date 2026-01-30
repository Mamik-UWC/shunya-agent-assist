import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Intent } from '@/features/configuration/types';
import type { Version } from '@/components/layout/VersionHistoryPanel';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';

interface IntentsState {
    intents: Intent[];
    versions: Version[];
    auditEntries: AuditTrailEntry[];
    setIntents: (intents: Intent[]) => void;
    setVersions: (versions: Version[]) => void;
    setAuditEntries: (entries: AuditTrailEntry[]) => void;
    addIntent: (intent: Intent) => void;
    updateIntent: (id: string, intent: Partial<Intent>) => void;
    deleteIntent: (id: string) => void;
    toggleIntent: (id: string, enabled: boolean) => void;
    getEnabledIntents: () => Intent[];
    searchIntents: (query: string) => Intent[];
}

export const useIntents = create<IntentsState>()(
    persist(
        (set, get) => ({
            intents: [],
            versions: [],
            auditEntries: [],
            setIntents: (intents) => set({ intents }),
            setVersions: (versions) => set({ versions }),
            setAuditEntries: (entries) => set({ auditEntries: entries }),
            addIntent: (intent) =>
                set((state) => ({ intents: [...state.intents, intent] })),
            updateIntent: (id, intent) =>
                set((state) => ({
                    intents: state.intents.map((i) =>
                        i.id === id ? { ...i, ...intent } : i
                    ),
                })),
            deleteIntent: (id) =>
                set((state) => ({
                    intents: state.intents.filter((i) => i.id !== id),
                })),
            toggleIntent: (id, enabled) =>
                set((state) => ({
                    intents: state.intents.map((i) =>
                        i.id === id ? { ...i, enabled } : i
                    ),
                })),
            getEnabledIntents: () => get().intents.filter((i) => i.enabled),
            searchIntents: (query) => {
                const lowerQuery = query.toLowerCase();
                return get().intents.filter(
                    (i) =>
                        i.name.toLowerCase().includes(lowerQuery) ||
                        i.description.toLowerCase().includes(lowerQuery) ||
                        i.keywords.some((k) => k.toLowerCase().includes(lowerQuery))
                );
            },
        }),
        {
            name: 'intents-storage',
        }
    )
);
