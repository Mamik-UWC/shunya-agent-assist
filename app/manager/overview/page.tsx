'use client';

import * as React from 'react';
import {
  DashboardFilters,
  KPIGrid,
  CallVolumeChart,
  IntentDistributionChart,
  RecentAlertsPanel,
  LeaderboardTable,
  SOPAdherenceScoreCard,
  UpsellMetricsPanel,
  useManagerKPI,
  type DashboardFiltersValues,
  type Agent,
} from '@/features/dashboards';
import type { Alert } from '@/types/manager';

export default function OverviewPage() {
  const [filters, setFilters] = React.useState<DashboardFiltersValues>({
    dateTo: new Date(),
  });
  const [agents, setAgents] = React.useState<Agent[]>([]);
  const [initialAlerts, setInitialAlerts] = React.useState<Alert[]>([]);

  const { data, loading, error } = useManagerKPI(
    filters.dateFrom,
    filters.dateTo,
    {
      agentId: filters.agentId,
      queue: filters.queue,
      team: filters.team,
    }
  );

  React.useEffect(() => {
    async function loadAgents() {
      try {
        const res = await fetch('/api/manager/agents');
        const json = await res.json();
        setAgents(json.agents ?? []);
      } catch {
        setAgents([]);
      }
    }
    loadAgents();
  }, []);

  React.useEffect(() => {
    async function loadAlerts() {
      try {
        const res = await fetch('/api/manager/alerts');
        const json = await res.json();
        setInitialAlerts(json.alerts ?? []);
      } catch {
        setInitialAlerts([]);
      }
    }
    loadAlerts();
  }, []);

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">Error loading dashboard data: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">Overview Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor key performance indicators and trends
          </p>
        </div>
        <DashboardFilters
          value={filters}
          onValueChange={setFilters}
          agents={agents}
        />
      </div>

      {loading ? (
        <div className="space-y-6">
          <KPIGrid />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CallVolumeChart />
            <IntentDistributionChart />
          </div>
          <RecentAlertsPanel />
          <LeaderboardTable />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SOPAdherenceScoreCard />
            <UpsellMetricsPanel />
          </div>
        </div>
      ) : data ? (
        <div className="space-y-6">
          <KPIGrid metrics={data.kpi} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CallVolumeChart />
            <IntentDistributionChart data={data.intentDistribution} />
          </div>
          <RecentAlertsPanel initialAlerts={initialAlerts} />
          <LeaderboardTable data={data.leaderboard} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SOPAdherenceScoreCard data={data.sopAdherence} />
            <UpsellMetricsPanel data={data.upsellMetrics} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
