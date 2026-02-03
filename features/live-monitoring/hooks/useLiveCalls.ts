'use client';

import { useEffect } from 'react';
import { useLiveMonitoringStore } from '@/stores/live-monitoring.store';


export function useLiveCalls() {
  const calls = useLiveMonitoringStore((state) => state.calls);

  const addCall = useLiveMonitoringStore((state) => state.addCall);
  const updateCall = useLiveMonitoringStore((state) => state.updateCall);
  const removeCall = useLiveMonitoringStore((state) => state.removeCall);
  const setConnected = useLiveMonitoringStore((state) => state.setConnected);

  useEffect(() => {
    // Simulate real-time updates with random data
    setConnected(true);

    // Initial load: 10 calls
    const initialCalls = Array.from({ length: 10 }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      agentId: `agent-${Math.floor(Math.random() * 5)}`,
      agentName: ['Sarah Jenkins', 'Mike Ross', 'Jessica Pearson', 'Harvey Specter', 'Louis Litt'][Math.floor(Math.random() * 5)],
      customerName: 'Customer ' + Math.floor(Math.random() * 1000),
      duration: Math.floor(Math.random() * 300),
      startTime: new Date(Date.now() - Math.floor(Math.random() * 300000)).toISOString(),
      status: 'active' as const,
      sentiment: ['positive', 'neutral', 'negative', 'warning'][Math.floor(Math.random() * 4)] as 'positive' | 'neutral' | 'negative' | 'warning',
      queue: 'General Support',
      transcription: 'Call in progress...',
      risks: [],
      riskFlags: [],
    }));
    
    // We need to access the store's setCalls/addCalls. Since we only have addCall/updateCall exposed, 
    // we might need to iterate or just use the store directly if we could, but here we'll just add them one by one
    // or better, assuming the store is empty initially or we just append. 
    // Actually, useLiveCalls doesn't expose setCalls anymore (I removed it). 
    // I should probably temporarily expose it or just use addCall loop.
    initialCalls.forEach(call => addCall(call));

    const intervalId = setInterval(() => {
      const currentCalls = useLiveMonitoringStore.getState().calls;
      
      // Update existing calls (simulate duration increment and random status change)
      currentCalls.forEach(call => {
        updateCall(call.id, {
          duration: call.duration + 5,
          sentiment: Math.random() > 0.8 ? (['positive', 'neutral', 'negative', 'warning'][Math.floor(Math.random() * 4)] as 'positive' | 'neutral' | 'negative' | 'warning') : call.sentiment,
        });
      });

      // Add new calls to eventually reach "loads" of data (limit 200)
      // User requested to keep only 10 calls and update their status
      /* 
      if (currentCalls.length < 200) {
        // ... (removed adding new calls logic)
      }
      */
    }, 5000);

    return () => {
      clearInterval(intervalId);
      setConnected(false);
    };
  }, [addCall, updateCall, removeCall, setConnected]);

  return { calls, loading: false };
}
