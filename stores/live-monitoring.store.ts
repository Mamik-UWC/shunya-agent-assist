import { create } from 'zustand';
import type { LiveCall } from '@/types/manager';

interface LiveMonitoringState {
  calls: LiveCall[];
  isConnected: boolean;
  setCalls: (calls: LiveCall[]) => void;
  addCall: (call: LiveCall) => void;
  updateCall: (callId: string, updates: Partial<LiveCall>) => void;
  removeCall: (callId: string) => void;
  setConnected: (connected: boolean) => void;
  reset: () => void;
}

export const useLiveMonitoringStore = create<LiveMonitoringState>((set) => ({
  calls: [],
  isConnected: false,
  setCalls: (calls) => set({ calls }),
  addCall: (call) =>
    set((state) => ({
      calls: state.calls.some((c) => c.id === call.id)
        ? state.calls
        : [...state.calls, call],
    })),
  updateCall: (callId, updates) =>
    set((state) => ({
      calls: state.calls.map((call) =>
        call.id === callId ? { ...call, ...updates } : call
      ),
    })),
  removeCall: (callId) =>
    set((state) => ({
      calls: state.calls.filter((call) => call.id !== callId),
    })),
  setConnected: (connected) => set({ isConnected: connected }),
  reset: () => set({ calls: [], isConnected: false }),
}));
