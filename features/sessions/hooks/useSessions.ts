'use client';

import { useState, useEffect } from 'react';
import type { SessionFilters } from '@/types/manager';

interface SessionListItem {
  id: string;
  agentId: string;
  agentName: string;
  customerId?: string;
  customerName?: string;
  startTime: string;
  endTime?: string;
  duration: number;
  status: 'active' | 'completed' | 'cancelled';
  intent?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  csat?: number;
  fcr: boolean;
}

interface SessionsResponse {
  sessions: SessionListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useSessions(filters?: SessionFilters, page: number = 1, limit: number = 20) {
  const [data, setData] = useState<SessionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSessions() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters?.dateTo) params.append('dateTo', filters.dateTo);
        if (filters?.agentId) params.append('agentId', filters.agentId);
        if (filters?.intent) params.append('intent', filters.intent);
        if (filters?.sentiment) params.append('sentiment', filters.sentiment);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.search) params.append('search', filters.search);
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        const response = await fetch(`/api/manager/sessions?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sessions');
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

    fetchSessions();
  }, [filters, page, limit]);

  return { data, loading, error };
}
