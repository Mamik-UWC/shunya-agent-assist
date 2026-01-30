import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuditLog } from '@/features/audit-logs/types';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';

interface AuditLogsState {
    logs: AuditLog[];
    auditTrailEntries: AuditTrailEntry[];
    setLogs: (logs: AuditLog[]) => void;
    setAuditTrailEntries: (entries: AuditTrailEntry[]) => void;
    addLog: (log: AuditLog) => void;
    addAuditTrailEntry: (entry: AuditTrailEntry) => void;
    filterLogsByResource: (resource: string) => AuditLog[];
    filterLogsByAction: (action: string) => AuditLog[];
}

export const useAuditLogs = create<AuditLogsState>()(
    persist(
        (set, get) => ({
            logs: [],
            auditTrailEntries: [],
            setLogs: (logs) => set({ logs }),
            setAuditTrailEntries: (entries) => set({ auditTrailEntries: entries }),
            addLog: (log) => set((state) => ({ logs: [log, ...state.logs] })),
            addAuditTrailEntry: (entry) =>
                set((state) => ({ auditTrailEntries: [entry, ...state.auditTrailEntries] })),
            filterLogsByResource: (resource) =>
                get().logs.filter((log) => log.resource === resource),
            filterLogsByAction: (action) =>
                get().logs.filter((log) => log.action === action),
        }),
        {
            name: 'audit-logs-storage',
        }
    )
);
