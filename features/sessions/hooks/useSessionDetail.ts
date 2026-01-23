'use client';

import { useState, useEffect } from 'react';
import type { SessionDetail } from '@/types/manager';

export function useSessionDetail(sessionId: string) {
  const [data, setData] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setData(null);
      setLoading(false);
      return;
    }

    async function fetchSessionDetail() {
      try {
        setLoading(true);
        const response = await fetch(`/api/manager/sessions/${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch session detail');
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

    fetchSessionDetail();
  }, [sessionId]);

  return { data, loading, error };
}
