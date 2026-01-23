'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  SessionHeader,
  SummaryPanel,
  SentimentTimeline,
  QAMetrics,
  CoachingInsights,
  UpsellAnalysis,
  useSessionDetail,
} from '@/features/sessions';

export default function SessionDetailPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const [sessionId, setSessionId] = React.useState<string>('');

  // Unwrap params
  React.useEffect(() => {
    params.then(p => setSessionId(p.sessionId));
  }, [params]);

  const { data: session, loading, error } = useSessionDetail(sessionId);

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">Error loading session: {error.message}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-32 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-muted animate-pulse rounded" />
          <div className="h-64 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SessionHeader session={session ?? undefined} />
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6 mt-6">
          <SummaryPanel session={session ?? undefined} />
        </TabsContent>
        <TabsContent value="sentiment" className="space-y-6 mt-6">
          <SentimentTimeline session={session ?? undefined} />
        </TabsContent>
        <TabsContent value="performance" className="space-y-6 mt-6">
          <QAMetrics session={session ?? undefined} />
        </TabsContent>
        <TabsContent value="insights" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CoachingInsights session={session ?? undefined} />
            <UpsellAnalysis session={session ?? undefined} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
