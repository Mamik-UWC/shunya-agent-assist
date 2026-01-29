'use client';

import { useState, useEffect } from 'react';
import type { CallVolumeBucket } from '@/types/manager';

export type CallVolumeTimeRange = '24h' | '7d' | '30d';

export function useCallVolumeTrends(timeRange: CallVolumeTimeRange = '7d') {
  const [data, setData] = useState<CallVolumeBucket[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTrends() {
      try {
        setLoading(true);
        const params = new URLSearchParams({ range: timeRange });
        const response = await fetch(`/api/manager/analytics/trends?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch call volume trends');
        const result = await response.json();
        setData(result.trends ?? []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchTrends();
  }, [timeRange]);

  return { data, loading, error };
}
