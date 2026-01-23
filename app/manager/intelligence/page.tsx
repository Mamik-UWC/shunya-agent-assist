'use client';

import * as React from 'react';
import {
  RootCauseClusterChart,
  FailureReasonsTable,
  TrainingRecommendations,
} from '@/features/intelligence';
import type { IntelligenceInsights } from '@/types/manager';

export default function IntelligencePage() {
  const [data, setData] = React.useState<IntelligenceInsights | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    async function fetchInsights() {
      try {
        setLoading(true);
        const response = await fetch('/api/manager/insights');
        if (!response.ok) {
          throw new Error('Failed to fetch insights');
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchInsights();
  }, []);

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">Error loading insights: {error.message}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-96 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Advanced Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Deep insights into root causes, failures, and training recommendations
        </p>
      </div>

      {data && (
        <>
          <RootCauseClusterChart data={data.rootCauses} />
          <FailureReasonsTable data={data.failureReasons} />
          <TrainingRecommendations data={data.trainingRecommendations} />
        </>
      )}
    </div>
  );
}
