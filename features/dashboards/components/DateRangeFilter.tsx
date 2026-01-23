'use client';

import * as React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DATE_RANGE_OPTIONS } from '@/constants/manager';
import { cn } from '@/lib/utils';

export interface DateRangeFilterProps {
  dateFrom?: Date;
  dateTo?: Date;
  onDateFromChange?: (date: Date | undefined) => void;
  onDateToChange?: (date: Date | undefined) => void;
  onPresetChange?: (preset: string) => void;
  className?: string;
}

export function DateRangeFilter({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onPresetChange,
  className,
}: DateRangeFilterProps) {
  const [preset, setPreset] = React.useState<string>('30d');

  const handlePresetChange = (value: string) => {
    setPreset(value);
    const now = new Date();
    let from: Date | undefined;
    let to: Date | undefined = now;

    switch (value) {
      case '7d':
        from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        from = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        from = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'lastMonth':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        from = lastMonth;
        to = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'custom':
        // Don't set dates, let user pick
        break;
      default:
        from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    if (value !== 'custom') {
      onDateFromChange?.(from);
      onDateToChange?.(to);
    }
    onPresetChange?.(value);
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Date Range</span>
      </div>
      <Select value={preset} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DATE_RANGE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {(preset === 'custom' || preset === 'lastMonth') && (
        <>
          <DatePicker
            value={dateFrom}
            onChange={onDateFromChange}
            placeholder="From date"
            max={dateTo}
          />
          <span className="text-sm text-muted-foreground">to</span>
          <DatePicker
            value={dateTo}
            onChange={onDateToChange}
            placeholder="To date"
            min={dateFrom}
          />
        </>
      )}
    </div>
  );
}
