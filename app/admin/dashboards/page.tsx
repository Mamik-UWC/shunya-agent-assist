import { ConfigHeader } from '@/components/layout/ConfigHeader';
import { DashboardFieldSelector } from '@/features/dashboards/components/DashboardFieldSelector';
import { Button } from '@/components/ui/button';
import type { AvailableWidget, Widget } from '@/features/dashboards/types';
import type { Version } from '@/components/layout/VersionHistoryPanel';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';

// Mock data for demonstration
const mockAvailableWidgets: AvailableWidget[] = [
  {
    id: 'widget1',
    type: 'kpi-card',
    name: 'Sessions KPI',
    description: 'Total number of sessions',
    category: 'metrics',
  },
  {
    id: 'widget2',
    type: 'kpi-card',
    name: 'CSAT Score',
    description: 'Customer satisfaction score',
    category: 'metrics',
  },
  {
    id: 'widget3',
    type: 'kpi-card',
    name: 'FCR Rate',
    description: 'First call resolution rate',
    category: 'metrics',
  },
  {
    id: 'widget4',
    type: 'line-chart',
    name: 'Sentiment Trend',
    description: 'Sentiment trends over time',
    category: 'charts',
  },
  {
    id: 'widget5',
    type: 'pie-chart',
    name: 'Intent Distribution',
    description: 'Distribution of call intents',
    category: 'charts',
  },
  {
    id: 'widget6',
    type: 'bar-chart',
    name: 'Agent Performance',
    description: 'Performance metrics by agent',
    category: 'charts',
  },
  {
    id: 'widget7',
    type: 'data-table',
    name: 'Leaderboard',
    description: 'Agent performance leaderboard',
    category: 'tables',
  },
  {
    id: 'widget8',
    type: 'data-table',
    name: 'SOP Adherence',
    description: 'SOP adherence scores',
    category: 'tables',
  },
  {
    id: 'widget9',
    type: 'metric-card',
    name: 'Upsell Metrics',
    description: 'Upsell performance metrics',
    category: 'metrics',
  },
];

const mockSelectedWidgets: Widget[] = [
  {
    id: 'widget1',
    type: 'kpi-card',
    name: 'Sessions KPI',
    enabled: true,
    config: {},
  },
  {
    id: 'widget2',
    type: 'kpi-card',
    name: 'CSAT Score',
    enabled: true,
    config: {},
  },
  {
    id: 'widget4',
    type: 'line-chart',
    name: 'Sentiment Trend',
    enabled: true,
    config: {},
  },
  {
    id: 'widget7',
    type: 'data-table',
    name: 'Leaderboard',
    enabled: false,
    config: {},
  },
];

const mockVersions: Version[] = [
  {
    id: 'v1',
    version: '1.0',
    createdAt: new Date().toISOString(),
    createdBy: 'admin@example.com',
    changes: ['Initial dashboard configuration', 'Selected 3 widgets'],
    isCurrent: true,
  },
];

const mockAuditEntries: AuditTrailEntry[] = [
  {
    id: 'audit1',
    action: 'configured',
    userId: 'user1',
    userName: 'admin@example.com',
    timestamp: new Date().toISOString(),
    details: 'Updated dashboard widget configuration',
    metadata: { widgets: ['widget1', 'widget2', 'widget4'] },
  },
];

export default function DashboardsPage() {
  return (
    <div className="space-y-6">
      <ConfigHeader
        title="Dashboard Configuration"
        description="Configure which widgets and metrics appear on your dashboards"
        actions={
          <Button variant="outline" size="sm">
            Reset to Defaults
          </Button>
        }
      />

      <DashboardFieldSelector
        availableWidgets={mockAvailableWidgets}
        selectedWidgets={mockSelectedWidgets}
        versions={mockVersions}
        auditEntries={mockAuditEntries}
      />
    </div>
  );
}
