// Manager constants

export const SENTIMENT_COLORS = {
  positive: 'hsl(142, 76%, 36%)',
  neutral: 'hsl(38, 92%, 50%)',
  negative: 'hsl(0, 84%, 60%)',
} as const;

export const INTENT_COLORS = [
  'hsl(221, 83%, 53%)',
  'hsl(280, 100%, 70%)',
  'hsl(340, 82%, 52%)',
  'hsl(10, 100%, 64%)',
  'hsl(30, 100%, 50%)',
  'hsl(50, 100%, 50%)',
  'hsl(200, 100%, 50%)',
  'hsl(250, 100%, 50%)',
] as const;

export const RISK_SEVERITY_COLORS = {
  low: 'hsl(38, 92%, 50%)',
  medium: 'hsl(30, 100%, 50%)',
  high: 'hsl(0, 84%, 60%)',
} as const;

export const DATE_RANGE_OPTIONS = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'This month', value: 'month' },
  { label: 'Last month', value: 'lastMonth' },
  { label: 'Custom', value: 'custom' },
] as const;

export const SESSION_STATUS_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
] as const;

export const SENTIMENT_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Positive', value: 'positive' },
  { label: 'Neutral', value: 'neutral' },
  { label: 'Negative', value: 'negative' },
] as const;
