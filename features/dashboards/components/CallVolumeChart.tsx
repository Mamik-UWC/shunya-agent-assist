'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CALL_VOLUME_TIME_RANGE_OPTIONS } from '@/constants/manager';
import type { CallVolumeBucket } from '@/types/manager';
import { useCallVolumeTrends, type CallVolumeTimeRange } from '../hooks/useCallVolumeTrends';

const CHART_COLOR = 'hsl(221, 83%, 53%)';

export interface CallVolumeChartProps {
  /** If provided, use this data instead of fetching (e.g. from parent overview payload). */
  data?: CallVolumeBucket[];
  timeRange?: CallVolumeTimeRange;
  onTimeRangeChange?: (range: CallVolumeTimeRange) => void;
  className?: string;
}

export function CallVolumeChart({
  data: controlledData,
  timeRange: controlledTimeRange,
  onTimeRangeChange,
  className,
}: CallVolumeChartProps) {
  const [internalRange, setInternalRange] = React.useState<CallVolumeTimeRange>('7d');
  const timeRange = controlledTimeRange ?? internalRange;

  const { data: fetchedData, loading, error } = useCallVolumeTrends(timeRange);
  const data = controlledData ?? fetchedData;

  const handleRangeChange = (value: string) => {
    const next = value as CallVolumeTimeRange;
    setInternalRange(next);
    onTimeRangeChange?.(next);
  };

  const labelForBucket = (bucket: string) => {
    if (timeRange === '24h') {
      const hour = bucket.slice(11, 13);
      return `${hour}:00`;
    }
    return new Date(bucket).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartData =
    data?.map((point) => ({
      label: labelForBucket(point.bucket),
      volume: point.volume,
    })) ?? [];

  const chartConfig = {
    volume: {
      label: 'Calls',
      color: CHART_COLOR,
    },
  };

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Call Volume Chart</CardTitle>
          <CardDescription>Call volume over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-destructive text-sm">
            Failed to load trends
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Call Volume Chart</CardTitle>
          <CardDescription>Call volume trends over time</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={handleRangeChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CALL_VOLUME_TIME_RANGE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {loading && !controlledData ? (
          <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md animate-pulse" />
        ) : !chartData.length ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No data available
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 12 }}
                  angle={chartData.length > 14 ? -45 : 0}
                  textAnchor={chartData.length > 14 ? 'end' : 'middle'}
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke={CHART_COLOR}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
