'use client';

import * as React from 'react';
import { AdvancedFilters, SessionTable, ExportButton, useSessions } from '@/features/sessions';
import type { SessionFilters } from '@/types/manager';

export default function SessionsPage() {
  const [filters, setFilters] = React.useState<SessionFilters>({});
  const [page, setPage] = React.useState(1);
  const { data, loading, error } = useSessions(filters, page, 20);

  const agents = React.useMemo(() => {
    // Extract unique agents from sessions
    if (!data?.sessions) return [];
    const agentMap = new Map<string, { id: string; name: string }>();
    data.sessions.forEach((session) => {
      if (!agentMap.has(session.agentId)) {
        agentMap.set(session.agentId, {
          id: session.agentId,
          name: session.agentName,
        });
      }
    });
    return Array.from(agentMap.values());
  }, [data?.sessions]);

  const intents = React.useMemo(() => {
    // Extract unique intents from sessions
    if (!data?.sessions) return [];
    const intentSet = new Set<string>();
    data.sessions.forEach((session) => {
      if (session.intent) {
        intentSet.add(session.intent);
      }
    });
    return Array.from(intentSet);
  }, [data?.sessions]);

  const handleExport = () => {
    if (data?.sessions) {
      // Export logic handled by ExportButton component
      console.log('Exporting sessions:', data.sessions);
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">Error loading sessions: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sessions</h1>
          <p className="text-muted-foreground mt-1">
            View and analyze call sessions
          </p>
        </div>
        {data && data.sessions.length > 0 && (
          <ExportButton data={data.sessions} onExport={handleExport} />
        )}
      </div>

      <AdvancedFilters
        filters={filters}
        onFiltersChange={setFilters}
        agents={agents}
        intents={intents}
      />

      <SessionTable sessions={data?.sessions} loading={loading} />
    </div>
  );
}
