'use client';

import * as React from 'react';
import {
  LiveCallGrid,
  RiskHighlightRules,
  InterventionActions,
  useLiveCalls,
} from '@/features/live-monitoring';
import type { InterventionAction } from '@/features/live-monitoring';

export default function LiveMonitoringPage() {
  const { calls, loading } = useLiveCalls();
  const [selectedCallId, setSelectedCallId] = React.useState<string | undefined>();

  const handleIntervene = (action: InterventionAction) => {
    console.log('Intervention action:', action);
    // In production, this would send the action to the backend
    alert(`Intervention action: ${action.type} for call ${selectedCallId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Live Call Monitoring</h1>
        <p className="text-muted-foreground mt-1">
          Monitor active calls in real-time and take intervention actions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveCallGrid calls={calls} loading={loading} />
        </div>
        <div className="space-y-6">
          <RiskHighlightRules />
          <InterventionActions
            callId={selectedCallId}
            onIntervene={handleIntervene}
          />
        </div>
      </div>
    </div>
  );
}
