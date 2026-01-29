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

export interface ManagerKPIFilters {
  agentId?: string;
  queue?: string;
  team?: string;
}

export function useManagerKPI(
  dateFrom?: Date,
  dateTo?: Date,
  filters?: ManagerKPIFilters
) {
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
        if (filters?.agentId && filters.agentId !== 'all') params.append('agentId', filters.agentId);
        if (filters?.queue && filters.queue !== 'all') params.append('queue', filters.queue);
        if (filters?.team && filters.team !== 'all') params.append('team', filters.team);

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
  }, [dateFrom, dateTo, filters?.agentId, filters?.queue, filters?.team]);

  return { data, loading, error };
}
