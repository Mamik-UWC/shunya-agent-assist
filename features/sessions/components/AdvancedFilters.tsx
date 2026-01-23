'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SESSION_STATUS_OPTIONS, SENTIMENT_OPTIONS } from '@/constants/manager';
import type { SessionFilters } from '@/types/manager';

export interface AdvancedFiltersProps {
  filters?: SessionFilters;
  onFiltersChange?: (filters: SessionFilters) => void;
  agents?: Array<{ id: string; name: string }>;
  intents?: string[];
  className?: string;
}

export function AdvancedFilters({
  filters = {},
  onFiltersChange,
  agents = [],
  intents = [],
  className,
}: AdvancedFiltersProps) {
  const [localFilters, setLocalFilters] = React.useState<SessionFilters>(filters);

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const updateFilter = (key: keyof SessionFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilter = (key: keyof SessionFilters) => {
    const newFilters = { ...localFilters };
    delete newFilters[key];
    setLocalFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAll = () => {
    setLocalFilters({});
    onFiltersChange?.({});
  };

  const hasActiveFilters = Object.keys(localFilters).length > 0;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date From</label>
            <DatePicker
              value={localFilters.dateFrom ? new Date(localFilters.dateFrom) : undefined}
              onChange={(date) => updateFilter('dateFrom', date?.toISOString())}
              placeholder="Select start date"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date To</label>
            <DatePicker
              value={localFilters.dateTo ? new Date(localFilters.dateTo) : undefined}
              onChange={(date) => updateFilter('dateTo', date?.toISOString())}
              placeholder="Select end date"
              min={localFilters.dateFrom ? new Date(localFilters.dateFrom) : undefined}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Agent</label>
            <Select
              value={localFilters.agentId || 'all'}
              onValueChange={(value) =>
                updateFilter('agentId', value === 'all' ? undefined : value)
              }
            >
              <SelectTrigger>
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
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Intent</label>
            <Select
              value={localFilters.intent || 'all'}
              onValueChange={(value) =>
                updateFilter('intent', value === 'all' ? undefined : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All intents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All intents</SelectItem>
                {intents.map((intent) => (
                  <SelectItem key={intent} value={intent}>
                    {intent}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Sentiment</label>
            <Select
              value={localFilters.sentiment || 'all'}
              onValueChange={(value) =>
                updateFilter('sentiment', value === 'all' ? undefined : value as any)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All sentiments" />
              </SelectTrigger>
              <SelectContent>
                {SENTIMENT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={localFilters.status || 'all'}
              onValueChange={(value) =>
                updateFilter('status', value === 'all' ? undefined : value as any)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                {SESSION_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Input
                placeholder="Search sessions..."
                value={localFilters.search || ''}
                onChange={(e) => updateFilter('search', e.target.value || undefined)}
              />
              {localFilters.search && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => clearFilter('search')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
