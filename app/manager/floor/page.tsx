"use client";

import * as React from "react";
import {
  FloorHeader,
  FloorFilters,
  ActiveCallCardGrid,
  RiskLegend,
  useFloorCalls,
} from "@/features/floor";
import type { FloorSlot, FloorStatusFilter } from "@/features/floor";

function filterSlots(
  slots: FloorSlot[],
  search: string,
  selectedAgentId: string,
  statusFilter: FloorStatusFilter
): FloorSlot[] {
  let result = slots;

  if (statusFilter === "active") {
    result = result.filter((s) => s.status === "active");
  } else if (statusFilter === "idle") {
    result = result.filter((s) => s.status === "idle");
  }

  if (selectedAgentId !== "all") {
    result = result.filter((s) => s.agentId === selectedAgentId);
  }

  const searchLower = search.trim().toLowerCase();
  if (searchLower) {
    result = result.filter((slot) => {
      if (slot.agentName.toLowerCase().includes(searchLower)) return true;
      if (slot.call) {
        if (slot.call.queue.toLowerCase().includes(searchLower)) return true;
        if (slot.call.intent.toLowerCase().includes(searchLower)) return true;
      }
      return false;
    });
  }

  return result;
}

export default function FloorPage() {
  const [autoRefresh, setAutoRefresh] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [selectedAgentId, setSelectedAgentId] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState<FloorStatusFilter>("all");

  const { calls, slots, loading, error } = useFloorCalls({ autoRefresh });

  const filteredSlots = React.useMemo(
    () => filterSlots(slots, search, selectedAgentId, statusFilter),
    [slots, search, selectedAgentId, statusFilter]
  );

  const filterAgents = React.useMemo(() => {
    const seen = new Set<string>();
    return slots
      .filter((s) => {
        if (seen.has(s.agentId)) return false;
        seen.add(s.agentId);
        return true;
      })
      .map((s) => ({ id: s.agentId, name: s.agentName }));
  }, [slots]);

  if (error) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          Error loading floor: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FloorHeader
        activeCount={calls.length}
        autoRefresh={autoRefresh}
        onAutoRefreshChange={setAutoRefresh}
      />
      <FloorFilters
        search={search}
        onSearchChange={setSearch}
        selectedAgentId={selectedAgentId}
        onSelectedAgentIdChange={setSelectedAgentId}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        agents={filterAgents}
      />
      <ActiveCallCardGrid slots={filteredSlots} loading={loading} />
      <RiskLegend />
    </div>
  );
}
