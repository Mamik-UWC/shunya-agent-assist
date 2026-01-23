// Dashboard components
export { DateRangeFilter } from './components/DateRangeFilter';
export { KPIGrid } from './components/KPIGrid';
export { SentimentTrendChart } from './components/SentimentTrendChart';
export { IntentDistributionChart } from './components/IntentDistributionChart';
export { LeaderboardTable } from './components/LeaderboardTable';
export { SOPAdherenceScoreCard } from './components/SOPAdherenceScoreCard';
export { UpsellMetricsPanel } from './components/UpsellMetricsPanel';
export { AgentSelector } from './components/AgentSelector';
export { PerformanceSummary } from './components/PerformanceSummary';
export { TrendCharts } from './components/TrendCharts';
export { QAComplianceTable } from './components/QAComplianceTable';
export { UpsellPerformanceChart } from './components/UpsellPerformanceChart';

// Hooks
export { useManagerKPI } from './hooks/useManagerKPI';
export { useAgentPerformance } from './hooks/useAgentPerformance';

// Types
export type { KPIMetrics, SentimentDataPoint, IntentDistribution, AgentLeaderboardEntry, SOPAdherenceMetrics, UpsellMetrics } from '@/types/manager';
export type { Agent } from './components/AgentSelector';
