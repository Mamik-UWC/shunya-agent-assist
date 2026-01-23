import { create } from "zustand";

interface CallData {
  id: string;
  duration: number;
  intent?: string;
  sentiment?: "positive" | "neutral" | "negative";
  [key: string]: unknown;
}

interface LiveCallState {
  callData: CallData | null;
  isConnected: boolean;
  setCallData: (data: CallData) => void;
  setConnected: (connected: boolean) => void;
  reset: () => void;
}

export const useLiveCallStore = create<LiveCallState>((set) => ({
  callData: null,
  isConnected: false,
  setCallData: (data) => set({ callData: data }),
  setConnected: (connected) => set({ isConnected: connected }),
  reset: () => set({ callData: null, isConnected: false }),
}));
