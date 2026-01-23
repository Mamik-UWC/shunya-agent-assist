export interface DashboardConfig {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface Widget {
  id: string;
  type: string;
  name: string;
  description?: string;
  enabled: boolean;
  config: Record<string, unknown>;
}

export interface AvailableWidget {
  id: string;
  type: string;
  name: string;
  description: string;
  category: 'metrics' | 'charts' | 'tables' | 'other';
  icon?: string;
}
