'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateRangeFilter } from './DateRangeFilter';
import { AgentSelector, type Agent } from './AgentSelector';
import { QUEUE_OPTIONS, TEAM_OPTIONS } from '@/constants/manager';
import { cn } from '@/lib/utils';

export interface DashboardFiltersValues {
  dateFrom?: Date;
  dateTo?: Date;
  agentId?: string;
  queue?: string;
  team?: string;
}

export interface DashboardFiltersProps {
  value?: DashboardFiltersValues;
  onValueChange?: (value: DashboardFiltersValues) => void;
  agents?: Agent[];
  className?: string;
}

export function DashboardFilters({
  value = {},
  onValueChange,
  agents = [],
  className,
}: DashboardFiltersProps) {
  const update = (partial: Partial<DashboardFiltersValues>) => {
    onValueChange?.({ ...value, ...partial });
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-4', className)}>
      <DateRangeFilter
        dateFrom={value.dateFrom}
        dateTo={value.dateTo}
        onDateFromChange={(dateFrom) => update({ dateFrom })}
        onDateToChange={(dateTo) => update({ dateTo })}
      />
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Queue</span>
        <Select
          value={value.queue ?? 'all'}
          onValueChange={(queue) => update({ queue })}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {QUEUE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Agent</span>
        <AgentSelector
          agents={agents}
          value={value.agentId ?? ''}
          onValueChange={(agentId) => update({ agentId: agentId || undefined })}
          placeholder="All agents"
          className="w-[160px]"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Team</span>
        <Select
          value={value.team ?? 'all'}
          onValueChange={(team) => update({ team })}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TEAM_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
