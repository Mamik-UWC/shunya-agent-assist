import { socketClient } from './socket-client';
import type { LiveCall, Alert } from '@/types/manager';
import type { RealtimeEvent } from './event-types';

class ManagerSocketClient {
  private isConnected = false;
  private wsUrl: string;

  constructor() {
    // In production, this would come from environment variables
    this.wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
  }

  connect(): void {
    if (this.isConnected) return;
    
    socketClient.connect(this.wsUrl);
    this.isConnected = true;
  }

  disconnect(): void {
    socketClient.disconnect();
    this.isConnected = false;
  }

  subscribeToLiveCalls(
    onCallStarted: (call: LiveCall) => void,
    onCallUpdated: (call: LiveCall) => void,
    onCallEnded: (callId: string) => void,
    onRiskAlert: (call: LiveCall) => void
  ): () => void {
    const unsubscribers: (() => void)[] = [];

    // Subscribe to call started events
    const unsub1 = socketClient.subscribe('live-call.started', (event: RealtimeEvent) => {
      if ('data' in event && typeof event.data === 'object' && event.data !== null) {
        const data = event.data as any;
        if (data.id) {
          onCallStarted(data as LiveCall);
        }
      }
    });
    unsubscribers.push(unsub1);

    // Subscribe to call updated events
    const unsub2 = socketClient.subscribe('live-call.updated', (event: RealtimeEvent) => {
      if ('data' in event && typeof event.data === 'object' && event.data !== null) {
        const data = event.data as any;
        if (data.id) {
          onCallUpdated(data as LiveCall);
        }
      }
    });
    unsubscribers.push(unsub2);

    // Subscribe to call ended events
    const unsub3 = socketClient.subscribe('live-call.ended', (event: RealtimeEvent) => {
      if ('data' in event && typeof event.data === 'object' && event.data !== null) {
        const data = event.data as any;
        if (data.callId) {
          onCallEnded(data.callId);
        }
      }
    });
    unsubscribers.push(unsub3);

    // Subscribe to risk alert events
    const unsub4 = socketClient.subscribe('live-call.risk-alert', (event: RealtimeEvent) => {
      if ('data' in event && typeof event.data === 'object' && event.data !== null) {
        const data = event.data as any;
        if (data.id) {
          onRiskAlert(data as LiveCall);
        }
      }
    });
    unsubscribers.push(unsub4);

    // Return cleanup function
    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }

  /** Subscribe to alert.* events (e.g. alert.critical, alert.warning). Updates in real-time. */
  subscribeToAlerts(onAlert: (alert: Alert) => void): () => void {
    const unsubscribers: (() => void)[] = [];

    const handleAlert = (event: RealtimeEvent) => {
      if ('data' in event && typeof event.data === 'object' && event.data !== null) {
        const data = event.data as Alert;
        if (data.id && data.severity && data.agentName !== undefined) {
          onAlert(data);
        }
      }
    };

    unsubscribers.push(socketClient.subscribe('alert.critical', handleAlert));
    unsubscribers.push(socketClient.subscribe('alert.warning', handleAlert));

    return () => unsubscribers.forEach((unsub) => unsub());
  }

  // For mock/development: simulate real-time updates
  startMockUpdates(callback: (calls: LiveCall[]) => void): () => void {
    let interval: NodeJS.Timeout | null = null;
    
    const updateCalls = async () => {
      try {
        const response = await fetch('/api/manager/live-calls');
        const data = await response.json();
        callback(data.calls || []);
      } catch (error) {
        console.error('Failed to fetch live calls:', error);
      }
    };

    // Initial fetch
    updateCalls();

    // Poll every 5 seconds (in production, this would be WebSocket)
    interval = setInterval(updateCalls, 5000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }
}

export const managerSocketClient = new ManagerSocketClient();
