import { RotateCcw } from 'lucide-react';
import { ConfigHeader } from '@/components/layout/ConfigHeader';
import { FeatureToggleMatrix } from '@/features/configuration/components/FeatureToggleMatrix';
import { Button } from '@/components/ui/button';
import type { FeatureFlagConfig } from '@/features/configuration/types';
import type { Version } from '@/components/layout/VersionHistoryPanel';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';
import { FEATURE_FLAGS } from '@/lib/feature-flags/flags';

// Mock data for demonstration
const mockFeatures: FeatureFlagConfig[] = [
  {
    id: 'feat1',
    key: FEATURE_FLAGS.LIVE_SENTIMENT,
    name: 'Live Sentiment Analysis',
    description: 'Real-time sentiment analysis during live calls',
    category: 'real-time',
    enabled: true,
    defaultValue: true,
  },
  {
    id: 'feat2',
    key: FEATURE_FLAGS.UPSELL_PROMPTS,
    name: 'Upsell Prompts',
    description: 'AI-powered upsell suggestions during calls',
    category: 'ai',
    enabled: true,
    defaultValue: true,
  },
  {
    id: 'feat3',
    key: FEATURE_FLAGS.AI_CHAT_ASSISTANT,
    name: 'AI Chat Assistant',
    description: 'AI-powered chat assistant for agents',
    category: 'ai',
    enabled: false,
    defaultValue: false,
  },
  {
    id: 'feat4',
    key: FEATURE_FLAGS.LIVE_MONITORING,
    name: 'Live Call Monitoring',
    description: 'Real-time monitoring dashboard for managers',
    category: 'real-time',
    enabled: true,
    defaultValue: true,
  },
  {
    id: 'feat5',
    key: FEATURE_FLAGS.ADVANCED_ANALYTICS,
    name: 'Advanced Analytics',
    description: 'Advanced analytics and reporting features',
    category: 'analytics',
    enabled: false,
    defaultValue: false,
  },
];

const mockVersions: Version[] = [
  {
    id: 'v1',
    version: '1.0',
    createdAt: new Date().toISOString(),
    createdBy: 'admin@example.com',
    changes: ['Initial feature flag configuration'],
    isCurrent: true,
  },
];

const mockAuditEntries: AuditTrailEntry[] = [
  {
    id: 'audit1',
    action: 'enabled',
    userId: 'user1',
    userName: 'admin@example.com',
    timestamp: new Date().toISOString(),
    details: 'Enabled feature: Live Sentiment Analysis',
    metadata: { featureId: 'feat1', featureKey: FEATURE_FLAGS.LIVE_SENTIMENT },
  },
  {
    id: 'audit2',
    action: 'disabled',
    userId: 'user1',
    userName: 'admin@example.com',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    details: 'Disabled feature: Advanced Analytics',
    metadata: { featureId: 'feat5', featureKey: FEATURE_FLAGS.ADVANCED_ANALYTICS },
  },
];

export default function FeaturesPage() {
  return (
    <div className="space-y-6">
      <ConfigHeader
        title="Feature Enablement"
        description="Enable or disable features for your organization. Changes take effect immediately."
        actions={
          <Button variant="outline" size="sm">
            <RotateCcw className="size-4" />
            Reset to Defaults
          </Button>
        }
      />

      <FeatureToggleMatrix
        features={mockFeatures}
        versions={mockVersions}
        auditEntries={mockAuditEntries}
      />
    </div>
  );
}
