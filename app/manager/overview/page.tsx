'use client';

import * as React from 'react';
import {
  DateRangeFilter,
  KPIGrid,
  SentimentTrendChart,
  IntentDistributionChart,
  LeaderboardTable,
  SOPAdherenceScoreCard,
  UpsellMetricsPanel,
  useManagerKPI,
} from '@/features/dashboards';

export default function OverviewPage() {
  const [dateFrom, setDateFrom] = React.useState<Date | undefined>();
  const [dateTo, setDateTo] = React.useState<Date | undefined>(new Date());
  const { data, loading, error } = useManagerKPI(dateFrom, dateTo);

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">Error loading dashboard data: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Overview Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor key performance indicators and trends
          </p>
        </div>
        <DateRangeFilter
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
        />
      </div>

      {loading ? (
        <div className="space-y-6">
          <KPIGrid />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SentimentTrendChart />
            <IntentDistributionChart />
          </div>
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
            <SentimentTrendChart data={data.sentimentTrend} />
            <IntentDistributionChart data={data.intentDistribution} />
          </div>
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
