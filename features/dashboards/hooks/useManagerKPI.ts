'use client';

import { useState, useEffect } from 'react';
import type {
  KPIMetrics,
  SentimentDataPoint,
  IntentDistribution,
  AgentLeaderboardEntry,
  SOPAdherenceMetrics,
  UpsellMetrics,
} from '@/types/manager';

interface KPIData {
  kpi: KPIMetrics;
  sentimentTrend: SentimentDataPoint[];
  intentDistribution: IntentDistribution[];
  leaderboard: AgentLeaderboardEntry[];
  sopAdherence: SOPAdherenceMetrics;
  upsellMetrics: UpsellMetrics;
}

export function useManagerKPI(dateFrom?: Date, dateTo?: Date) {
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchKPI() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (dateFrom) params.append('dateFrom', dateFrom.toISOString());
        if (dateTo) params.append('dateTo', dateTo.toISOString());

        const response = await fetch(`/api/manager/kpi?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch KPI data');
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

    fetchKPI();
  }, [dateFrom, dateTo]);

  return { data, loading, error };
}
