"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FloorStatusFilter = "all" | "active" | "idle";

export interface FloorFilterAgent {
  id: string;
  name: string;
}

export interface FloorFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedAgentId: string;
  onSelectedAgentIdChange: (value: string) => void;
  statusFilter: FloorStatusFilter;
  onStatusFilterChange: (value: FloorStatusFilter) => void;
  agents: FloorFilterAgent[];
  className?: string;
}

export function FloorFilters({
  search,
  onSearchChange,
  selectedAgentId,
  onSelectedAgentIdChange,
  statusFilter,
  onStatusFilterChange,
  agents,
  className,
}: FloorFiltersProps) {
  return (
    <div
      className={className}
      role="search"
      aria-label="Floor filters"
    >
      <div className="flex flex-wrap items-center gap-4">
        <Input
          type="search"
          placeholder="Search by name, queue, intent"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-xs"
          aria-label="Search"
        />
        <Select
          value={selectedAgentId}
          onValueChange={onSelectedAgentIdChange}
        >
          <SelectTrigger className="w-[180px]" aria-label="Filter by agent">
            <SelectValue placeholder="All agents" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All agents</SelectItem>
            {agents.map((agent) => (
              <SelectItem key={agent.id} value={agent.id}>
                {agent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(v) => onStatusFilterChange(v as FloorStatusFilter)}
        >
          <SelectTrigger className="w-[140px]" aria-label="Filter by status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="idle">Idle</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
