import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WebhookConfig } from '@/features/configuration/types';
import type { Version } from '@/components/layout/VersionHistoryPanel';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';

interface WebhooksState {
    webhooks: WebhookConfig[];
    versions: Version[];
    auditEntries: AuditTrailEntry[];
    setWebhooks: (webhooks: WebhookConfig[]) => void;
    setVersions: (versions: Version[]) => void;
    setAuditEntries: (entries: AuditTrailEntry[]) => void;
    addWebhook: (webhook: WebhookConfig) => void;
    updateWebhook: (id: string, webhook: Partial<WebhookConfig>) => void;
    deleteWebhook: (id: string) => void;
    toggleWebhook: (id: string, active: boolean) => void;
    getActiveWebhooks: () => WebhookConfig[];
}

export const useWebhooks = create<WebhooksState>()(
    persist(
        (set, get) => ({
            webhooks: [],
            versions: [],
            auditEntries: [],
            setWebhooks: (webhooks) => set({ webhooks }),
            setVersions: (versions) => set({ versions }),
            setAuditEntries: (entries) => set({ auditEntries: entries }),
            addWebhook: (webhook) =>
                set((state) => ({ webhooks: [...state.webhooks, webhook] })),
            updateWebhook: (id, webhook) =>
                set((state) => ({
                    webhooks: state.webhooks.map((w) =>
                        w.id === id ? { ...w, ...webhook } : w
                    ),
                })),
            deleteWebhook: (id) =>
                set((state) => ({
                    webhooks: state.webhooks.filter((w) => w.id !== id),
                })),
            toggleWebhook: (id, active) =>
                set((state) => ({
                    webhooks: state.webhooks.map((w) =>
                        w.id === id ? { ...w, active } : w
                    ),
                })),
            getActiveWebhooks: () => get().webhooks.filter((w) => w.active),
        }),
        {
            name: 'webhooks-storage',
        }
    )
);
