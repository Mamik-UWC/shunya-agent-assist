'use client';

import * as React from 'react';
import {
  CallSummary,
  KeyMomentsTimeline,
  TranscriptViewer,
  TicketDraftPanel,
} from '@/features/post-call';
import { ComplianceReport } from '@/features/post-call/components/ComplianceReport';
import type { PostCallData, KeyMoment, ComplianceReport as ComplianceReportType } from '@/features/post-call';

export default function PostCallPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const [postCallData, setPostCallData] = React.useState<PostCallData | null>(null);
  const [sessionId, setSessionId] = React.useState<string>('');

  // Unwrap params
  React.useEffect(() => {
    params.then(p => setSessionId(p.sessionId));
  }, [params]);

  // Mock data - in production, fetch from API using sessionId
  React.useEffect(() => {
    if (!sessionId) return;
    
    // Simulate API call
    const mockData: PostCallData = {
      sessionId,
      summary: 'Customer called to inquire about product features. Agent provided comprehensive information about pricing, features, and benefits. Customer expressed interest in scheduling a demo. Call ended on a positive note with next steps scheduled.',
      keyMoments: [
        {
          timestamp: 30,
          description: 'Customer asked about pricing',
          type: 'neutral',
        },
        {
          timestamp: 120,
          description: 'Agent explained key features',
          type: 'positive',
        },
        {
          timestamp: 240,
          description: 'Customer expressed interest in demo',
          type: 'upsell',
        },
      ],
      transcript: `[00:00] Agent: Hello, thank you for calling. How can I assist you today?
[00:05] Customer: Hi, I'm interested in learning more about your product.
[00:10] Agent: I'd be happy to help! What specific aspects would you like to know about?
[00:15] Customer: Well, I'm curious about the pricing and what features are included.
[00:20] Agent: Great question! Our product comes in three tiers...`,
      complianceReport: {
        status: 'compliant',
        issues: [],
      },
      metadata: {
        duration: 300,
        startTime: new Date().toISOString(),
        agentName: 'Agent Smith',
        customerName: 'John Doe',
      },
    };
    setPostCallData(mockData);
  }, [sessionId]);

  const handleSaveTicket = (data: {
    title: string;
    description: string;
    priority: string;
    category: string;
  }) => {
    console.log('Saving ticket:', data);
    // Handle ticket creation
  };

  if (!postCallData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading post-call data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Post-Call Analysis</h1>
        <p className="text-muted-foreground">
          Session ID: {sessionId}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CallSummary data={postCallData} />
          <KeyMomentsTimeline moments={postCallData.keyMoments} />
          <TranscriptViewer transcript={postCallData.transcript} />
        </div>
        <div className="space-y-6">
          <ComplianceReport report={postCallData.complianceReport} />
          <TicketDraftPanel onSave={handleSaveTicket} />
        </div>
      </div>
    </div>
  );
}
