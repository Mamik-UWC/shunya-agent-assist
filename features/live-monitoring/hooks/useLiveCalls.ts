'use client';

import { useEffect } from 'react';
import { useLiveMonitoringStore } from '@/stores/live-monitoring.store';
import { managerSocketClient } from '@/lib/realtime/manager-socket';

export function useLiveCalls() {
  const calls = useLiveMonitoringStore((state) => state.calls);
  const setCalls = useLiveMonitoringStore((state) => state.setCalls);
  const addCall = useLiveMonitoringStore((state) => state.addCall);
  const updateCall = useLiveMonitoringStore((state) => state.updateCall);
  const removeCall = useLiveMonitoringStore((state) => state.removeCall);
  const setConnected = useLiveMonitoringStore((state) => state.setConnected);

  useEffect(() => {
    // For development, use mock polling
    // In production, this would use WebSocket
    const cleanup = managerSocketClient.startMockUpdates((newCalls) => {
      setCalls(newCalls);
    });

    // Subscribe to real-time events (for production WebSocket)
    const unsubscribe = managerSocketClient.subscribeToLiveCalls(
      (call) => {
        addCall(call);
      },
      (call) => {
        updateCall(call.id, call);
      },
      (callId) => {
        removeCall(callId);
      },
      (call) => {
        // Handle risk alerts
        updateCall(call.id, call);
      }
    );

    setConnected(true);

    return () => {
      cleanup();
      unsubscribe();
      setConnected(false);
    };
  }, [setCalls, addCall, updateCall, removeCall, setConnected]);

  return { calls, loading: false };
}
