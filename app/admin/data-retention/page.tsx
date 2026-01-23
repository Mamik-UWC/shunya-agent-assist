import { ConfigHeader } from '@/components/layout/ConfigHeader';
import { RetentionPolicyEditor } from '@/features/configuration/components/RetentionPolicyEditor';
import { Button } from '@/components/ui/button';
import type { RetentionPolicy } from '@/features/configuration/types';
import type { Version } from '@/components/layout/VersionHistoryPanel';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';

// Mock data for demonstration
const mockPolicies: RetentionPolicy[] = [
  {
    id: 'policy1',
    dataType: 'calls',
    retentionPeriodDays: 90,
    action: 'archive',
    enabled: true,
  },
  {
    id: 'policy2',
    dataType: 'transcripts',
    retentionPeriodDays: 365,
    action: 'archive',
    enabled: true,
  },
  {
    id: 'policy3',
    dataType: 'logs',
    retentionPeriodDays: 30,
    action: 'delete',
    enabled: true,
  },
  {
    id: 'policy4',
    dataType: 'analytics',
    retentionPeriodDays: 730,
    action: 'archive',
    enabled: false,
  },
];

const mockVersions: Version[] = [
  {
    id: 'v1',
    version: '1.0',
    createdAt: new Date().toISOString(),
    createdBy: 'admin@example.com',
    changes: ['Initial retention policy configuration', 'Configured 4 policies'],
    isCurrent: true,
  },
];

const mockAuditEntries: AuditTrailEntry[] = [
  {
    id: 'audit1',
    action: 'created',
    userId: 'user1',
    userName: 'admin@example.com',
    timestamp: new Date().toISOString(),
    details: 'Created retention policy: Call Recordings - 90 days',
    metadata: { policyId: 'policy1', dataType: 'calls', period: 90 },
  },
  {
    id: 'audit2',
    action: 'updated',
    userId: 'user1',
    userName: 'admin@example.com',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    details: 'Updated retention policy: Transcripts',
    metadata: { policyId: 'policy2', changes: ['Increased retention period'] },
  },
];

export default function DataRetentionPage() {
  return (
    <div className="space-y-6">
      <ConfigHeader
        title="Data Retention Policies"
        description="Configure how long to retain different types of data and what action to take when retention periods expire"
        actions={
          <Button variant="outline" size="sm">
            View Compliance Guide
          </Button>
        }
      />

      <RetentionPolicyEditor
        policies={mockPolicies}
        versions={mockVersions}
        auditEntries={mockAuditEntries}
      />
    </div>
  );
}
