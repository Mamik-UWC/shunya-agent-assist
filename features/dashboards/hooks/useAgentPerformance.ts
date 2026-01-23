'use client';

import { useState, useEffect } from 'react';
import type { AgentPerformance } from '@/types/manager';

export function useAgentPerformance(agentId?: string) {
  const [data, setData] = useState<AgentPerformance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!agentId) {
      setData(null);
      setLoading(false);
      return;
    }

    async function fetchPerformance() {
      try {
        setLoading(true);
        const response = await fetch(`/api/manager/agents?agentId=${agentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch agent performance');
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

    fetchPerformance();
  }, [agentId]);

  return { data, loading, error };
}
