"use client";

import { useEffect, useCallback, useState } from "react";
import type { FloorCall, FloorSlot } from "@/features/floor/types";

const POLL_INTERVAL_MS = 2500;
const FLOOR_API = "/api/manager/floor";
const AGENTS_API = "/api/manager/agents";

interface AgentListItem {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

async function fetchFloorCalls(): Promise<FloorCall[]> {
  const res = await fetch(FLOOR_API);
  if (!res.ok) {
    throw new Error(`Floor API error: ${res.status}`);
  }
  const data = await res.json();
  return data.calls ?? [];
}

async function fetchAgents(): Promise<AgentListItem[]> {
  const res = await fetch(AGENTS_API);
  if (!res.ok) {
    throw new Error(`Agents API error: ${res.status}`);
  }
  const data = await res.json();
  return data.agents ?? [];
}

function mergeAgentsAndCalls(
  agents: AgentListItem[],
  calls: FloorCall[]
): FloorSlot[] {
  const callByAgentId = new Map<string, FloorCall>();
  for (const call of calls) {
    callByAgentId.set(call.agentId, call);
  }
  return agents.map((agent) => {
    const call = callByAgentId.get(agent.id);
    if (call) {
      return {
        agentId: agent.id,
        agentName: agent.name,
        status: "active" as const,
        call,
      };
    }
    return {
      agentId: agent.id,
      agentName: agent.name,
      status: "idle" as const,
    };
  });
}

export interface UseFloorCallsOptions {
  autoRefresh?: boolean;
}

export interface UseFloorCallsResult {
  calls: FloorCall[];
  slots: FloorSlot[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useFloorCalls(
  options: UseFloorCallsOptions = {}
): UseFloorCallsResult {
  const { autoRefresh = true } = options;
  const [calls, setCalls] = useState<FloorCall[]>([]);
  const [slots, setSlots] = useState<FloorSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [callsData, agentsData] = await Promise.all([
        fetchFloorCalls(),
        fetchAgents(),
      ]);
      setCalls(callsData);
      setSlots(mergeAgentsAndCalls(agentsData, callsData));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setCalls([]);
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(refresh, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [autoRefresh, refresh]);

  return { calls, slots, loading, error, refresh };
}
