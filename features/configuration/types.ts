export interface Configuration {
  [key: string]: unknown;
}

export interface Intent {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  confidenceThreshold: number;
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeatureFlagConfig {
  id: string;
  key: string;
  name: string;
  description: string;
  category: 'real-time' | 'analytics' | 'ai' | 'automation' | 'other';
  enabled: boolean;
  defaultValue?: boolean;
}

export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  headers?: Record<string, string>;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RetentionPolicy {
  id: string;
  dataType: 'calls' | 'transcripts' | 'logs' | 'analytics' | 'other';
  retentionPeriodDays: number;
  action: 'delete' | 'archive';
  enabled: boolean;
}
