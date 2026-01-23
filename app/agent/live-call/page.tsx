'use client';

import * as React from 'react';
import {
  LiveCallHeader,
  IntentBadge,
  SentimentIndicator,
  SOPFlowPanel,
  NextBestActionCard,
  ComplianceStatus,
  UpsellPrompt,
  AgentChatDock,
} from '@/features/live-call';
import { useLiveCallStore } from '@/stores/live-call.store';

export default function LiveCallPage() {
  const callData = useLiveCallStore((state) => state.callData);

  // Mock data for demonstration - in production, this would come from API/WebSocket
  React.useEffect(() => {
    if (!callData) {
      useLiveCallStore.getState().setCallData({
        id: 'call-123',
        duration: 0,
        intent: 'Product Inquiry',
        confidence: 0.85,
        sentiment: 'positive',
        agentSentiment: 'neutral',
        customerSentimentValue: 0.8,
        agentSentimentValue: 0.6,
        complianceStatus: 'compliant',
        sopSteps: [
          {
            id: 'step-1',
            title: 'Greet Customer',
            description: 'Welcome the customer and introduce yourself',
            status: 'completed',
          },
          {
            id: 'step-2',
            title: 'Identify Need',
            description: 'Understand the customer requirement',
            status: 'current',
          },
          {
            id: 'step-3',
            title: 'Provide Solution',
            description: 'Offer appropriate product or service',
            status: 'pending',
          },
        ],
        currentStepId: 'step-2',
        suggestedActions: [
          {
            id: 'action-1',
            title: 'Offer Product Demo',
            description: 'Schedule a product demonstration for the customer',
            priority: 'high',
          },
        ],
      });
    }
  }, [callData]);

  const handleActionSelect = (actionId: string) => {
    console.log('Action selected:', actionId);
    // Handle action selection
  };

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // Handle message sending
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Live Call</h1>
        <p className="text-muted-foreground">
          Real-time decision support during active calls
        </p>
      </div>

      <LiveCallHeader
        customerId="CUST-12345"
        customerName="John Doe"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IntentBadge />
            <SentimentIndicator />
            <ComplianceStatus />
            <UpsellPrompt
              onDismiss={() => console.log('Dismissed')}
              onApply={(id) => console.log('Applied:', id)}
            />
          </div>
          <SOPFlowPanel />
          <NextBestActionCard onActionSelect={handleActionSelect} />
        </div>
        <div className="space-y-6">
          {/* Additional sidebar content can go here */}
        </div>
      </div>

      <AgentChatDock
        messages={[]}
        onSendMessage={handleSendMessage}
        position="bottom-right"
      />
    </div>
  );
}
