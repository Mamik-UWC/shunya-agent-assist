'use client';

import { AuditTrailViewer } from '@/components/layout/AuditTrailViewer';
import { AuditLogTable } from './AuditLogTable';
import type { AuditLog } from '../types';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';

export interface AuditLogsViewProps {
  logs?: AuditLog[];
  auditTrailEntries?: AuditTrailEntry[];
}

export function AuditLogsView({
  logs = [],
  auditTrailEntries = [],
}: AuditLogsViewProps) {
  const handleExport = () => {
    console.log('Exporting audit logs...');
    // TODO: Implement export functionality
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <AuditLogTable logs={logs} onExport={handleExport} />
      </div>
      <div>
        <AuditTrailViewer
          resourceId="system"
          resourceType="system"
          entries={auditTrailEntries}
          limit={10}
        />
      </div>
    </div>
  );
}
