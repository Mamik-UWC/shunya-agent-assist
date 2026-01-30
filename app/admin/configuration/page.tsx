'use client';

import { ConfigHeader } from '@/components/layout/ConfigHeader';
import { DashboardFieldSelector } from '@/features/dashboards/components/DashboardFieldSelector';
import { Button } from '@/components/ui/button';
import { useDashboardConfig } from '@/stores/use-dashboard-config';
import type { AvailableWidget } from '@/features/dashboards/types';
import type { Version } from '@/components/layout/VersionHistoryPanel';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';

// Mock data for demonstration
const mockAvailableWidgets: AvailableWidget[] = [
  {
    id: 'widget1',
    type: 'kpi-card',
    name: 'Active Sessions',
    description: 'Total number of active sessions',
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
    name: 'Avg Resolution',
    description: 'Average resolution time',
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
    name: 'Top Automations',
    description: 'Top performing automations',
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
    type: 'kpi-card',
    name: 'Automation Rate',
    description: 'Automation rate percentage',
    category: 'metrics',
  },
];

const mockVersions: Version[] = [
  {
    id: 'v1',
    version: '1.0',
    createdAt: new Date().toISOString(),
    createdBy: 'admin@example.com',
    changes: ['Initial dashboard configuration', 'Selected widgets'],
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

export default function ConfigurationPage() {
  const { selectedWidgets, toggleWidget } = useDashboardConfig();

  const handleReset = () => {
    // TODO: Implement reset to defaults
    console.log('Reset to defaults');
  };

  return (
    <div className="space-y-6">
      <ConfigHeader
        title="Dashboard Configuration"
        description="Configure which widgets and metrics appear on your dashboards"
        actions={
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset to Defaults
          </Button>
        }
      />

      <DashboardFieldSelector
        availableWidgets={mockAvailableWidgets}
        selectedWidgets={selectedWidgets}
        versions={mockVersions}
        auditEntries={mockAuditEntries}
        onWidgetToggle={toggleWidget}
      />
    </div>
  );
}
