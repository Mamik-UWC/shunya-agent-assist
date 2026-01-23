import { ConfigHeader } from '@/components/layout/ConfigHeader';
import { WebhookConfigForm } from '@/features/configuration/components/WebhookConfigForm';
import { Button } from '@/components/ui/button';
import type { WebhookConfig } from '@/features/configuration/types';
import type { Version } from '@/components/layout/VersionHistoryPanel';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';

// Mock data for demonstration
const mockWebhooks: WebhookConfig[] = [
  {
    id: 'webhook1',
    name: 'Production Webhook',
    url: 'https://api.example.com/webhooks/calls',
    events: ['call.started', 'call.ended', 'call.transcribed'],
    headers: {
      'Authorization': 'Bearer token123',
      'X-Custom-Header': 'value',
    },
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'webhook2',
    name: 'Analytics Webhook',
    url: 'https://analytics.example.com/events',
    events: ['intent.detected', 'sentiment.changed', 'session.completed'],
    headers: {
      'X-API-Key': 'analytics-key-456',
    },
    active: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'webhook3',
    name: 'Compliance Alert Webhook',
    url: 'https://compliance.example.com/alerts',
    events: ['compliance.alert'],
    headers: {},
    active: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const mockVersions: Version[] = [
  {
    id: 'v1',
    version: '1.0',
    createdAt: new Date().toISOString(),
    createdBy: 'admin@example.com',
    changes: ['Initial webhook configuration', 'Added 3 webhooks'],
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
    details: 'Created webhook: Production Webhook',
    metadata: { webhookId: 'webhook1', url: 'https://api.example.com/webhooks/calls' },
  },
  {
    id: 'audit2',
    action: 'updated',
    userId: 'user1',
    userName: 'admin@example.com',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    details: 'Updated webhook: Analytics Webhook',
    metadata: { webhookId: 'webhook2', changes: ['Added new event'] },
  },
];

export default function AutomationPage() {
  return (
    <div className="space-y-6">
      <ConfigHeader
        title="Automation & Webhooks"
        description="Configure webhooks to receive real-time events and automate workflows"
        actions={
          <Button variant="outline" size="sm">
            View Documentation
          </Button>
        }
      />

      <WebhookConfigForm
        webhooks={mockWebhooks}
        versions={mockVersions}
        auditEntries={mockAuditEntries}
      />
    </div>
  );
}
