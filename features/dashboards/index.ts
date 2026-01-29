// Dashboard components
export { DateRangeFilter } from './components/DateRangeFilter';
export { DashboardFilters } from './components/DashboardFilters';
export { KPIGrid } from './components/KPIGrid';
export { SentimentTrendChart } from './components/SentimentTrendChart';
export { IntentDistributionChart } from './components/IntentDistributionChart';
export { LeaderboardTable } from './components/LeaderboardTable';
export { SOPAdherenceScoreCard } from './components/SOPAdherenceScoreCard';
export { UpsellMetricsPanel } from './components/UpsellMetricsPanel';
export { AgentSelector } from './components/AgentSelector';
export { PerformanceSummary } from './components/PerformanceSummary';
export { TrendCharts } from './components/TrendCharts';
export { CallVolumeChart } from './components/CallVolumeChart';
export { RecentAlertsPanel } from './components/RecentAlertsPanel';
export { QAComplianceTable } from './components/QAComplianceTable';
export { UpsellPerformanceChart } from './components/UpsellPerformanceChart';

// Hooks
export { useManagerKPI, type ManagerKPIFilters } from './hooks/useManagerKPI';
export { useCallVolumeTrends } from './hooks/useCallVolumeTrends';
export { useAgentPerformance } from './hooks/useAgentPerformance';

// Types
export type { KPIMetrics, SentimentDataPoint, CallVolumeBucket, IntentDistribution, AgentLeaderboardEntry, SOPAdherenceMetrics, UpsellMetrics } from '@/types/manager';
export type { CallVolumeTimeRange } from './hooks/useCallVolumeTrends';
export type { Agent } from './components/AgentSelector';
export type { DashboardFiltersValues } from './components/DashboardFilters';