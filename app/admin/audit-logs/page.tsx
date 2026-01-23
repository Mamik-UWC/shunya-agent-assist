import { ConfigHeader } from '@/components/layout/ConfigHeader';
import { AuditLogsView } from '@/features/audit-logs/components/AuditLogsView';
import { Button } from '@/components/ui/button';
import type { AuditLog } from '@/features/audit-logs/types';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';

// Mock data for demonstration
const mockAuditLogs: AuditLog[] = [
  {
    id: 'log1',
    userId: 'user1',
    action: 'created',
    resource: 'knowledge',
    timestamp: new Date().toISOString(),
    metadata: { documentId: '1', title: 'Customer Service SOP' },
  },
  {
    id: 'log2',
    userId: 'user2',
    action: 'updated',
    resource: 'intent',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    metadata: { intentId: 'intent1', changes: ['Updated intent name'] },
  },
  {
    id: 'log3',
    userId: 'user1',
    action: 'deleted',
    resource: 'document',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    metadata: { documentId: '3' },
  },
  {
    id: 'log4',
    userId: 'admin',
    action: 'configured',
    resource: 'feature',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    metadata: { featureId: 'live_sentiment', enabled: true },
  },
];

const mockAuditTrailEntries: AuditTrailEntry[] = [
  {
    id: 'trail1',
    action: 'created',
    userId: 'user1',
    userName: 'admin@example.com',
    timestamp: new Date().toISOString(),
    details: 'Created new knowledge document',
    metadata: { documentId: '1', title: 'Customer Service SOP' },
  },
  {
    id: 'trail2',
    action: 'updated',
    userId: 'user2',
    userName: 'manager@example.com',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    details: 'Updated intent configuration',
    metadata: { intentId: 'intent1', changes: ['Updated intent name'] },
  },
];

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <ConfigHeader
        title="Audit Log Viewer"
        description="View and analyze all system audit logs and configuration changes"
        actions={
          <Button variant="outline" size="sm">
            Export All
          </Button>
        }
      />

      <AuditLogsView
        logs={mockAuditLogs}
        auditTrailEntries={mockAuditTrailEntries}
      />
    </div>
  );
}
