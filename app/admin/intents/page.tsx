import { ConfigHeader } from '@/components/layout/ConfigHeader';
import { IntentEditor } from '@/features/configuration/components/IntentEditor';
import { Button } from '@/components/ui/button';
import type { Intent } from '@/features/configuration/types';
import type { Version } from '@/components/layout/VersionHistoryPanel';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';

// Mock data for demonstration
const mockIntents: Intent[] = [
  {
    id: 'intent1',
    name: 'Customer Support Request',
    description: 'Customer needs help with a product or service issue',
    keywords: ['help', 'support', 'issue', 'problem', 'assistance'],
    confidenceThreshold: 0.75,
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'intent2',
    name: 'Product Inquiry',
    description: 'Customer is asking about product features or pricing',
    keywords: ['product', 'feature', 'price', 'cost', 'information'],
    confidenceThreshold: 0.7,
    enabled: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'intent3',
    name: 'Billing Question',
    description: 'Customer has questions about billing or payment',
    keywords: ['billing', 'payment', 'invoice', 'charge', 'bill'],
    confidenceThreshold: 0.8,
    enabled: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const mockVersions: Version[] = [
  {
    id: 'v1',
    version: '1.0',
    createdAt: new Date().toISOString(),
    createdBy: 'admin@example.com',
    changes: ['Initial intent configuration', 'Added 3 base intents'],
    isCurrent: true,
  },
  {
    id: 'v2',
    version: '0.9',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    createdBy: 'admin@example.com',
    changes: ['Draft version'],
  },
];

const mockAuditEntries: AuditTrailEntry[] = [
  {
    id: 'audit1',
    action: 'created',
    userId: 'user1',
    userName: 'admin@example.com',
    timestamp: new Date().toISOString(),
    details: 'Created intent: Customer Support Request',
    metadata: { intentId: 'intent1', name: 'Customer Support Request' },
  },
  {
    id: 'audit2',
    action: 'updated',
    userId: 'user1',
    userName: 'admin@example.com',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    details: 'Updated intent: Product Inquiry',
    metadata: { intentId: 'intent2', changes: ['Updated confidence threshold'] },
  },
];

export default function IntentsPage() {
  return (
    <div className="space-y-6">
      <ConfigHeader
        title="Intent Configuration"
        description="Configure call intents and their detection parameters for better call routing and analysis"
        actions={
          <Button variant="outline" size="sm">
            Import Intents
          </Button>
        }
      />

      <IntentEditor
        intents={mockIntents}
        versions={mockVersions}
        auditEntries={mockAuditEntries}
      />
    </div>
  );
}
