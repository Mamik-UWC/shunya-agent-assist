'use client';

import * as React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { KPIMetrics } from '@/types/manager';

export interface KPIGridProps {
  metrics?: KPIMetrics;
  className?: string;
}

export function KPIGrid({ metrics, className }: KPIGridProps) {
  if (!metrics) {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4', className)}>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const kpis = [
    {
      label: 'Total Sessions',
      value: metrics.sessions.total.toLocaleString(),
      change: metrics.sessions.change,
      trend: metrics.sessions.trend,
      format: (val: number) => val.toLocaleString(),
    },
    {
      label: 'CSAT Score',
      value: metrics.csat.score.toFixed(1),
      change: metrics.csat.change,
      trend: metrics.csat.trend,
      format: (val: number) => val.toFixed(1),
    },
    {
      label: 'FCR Rate',
      value: `${(metrics.fcr.rate * 100).toFixed(1)}%`,
      change: metrics.fcr.change * 100,
      trend: metrics.fcr.trend,
      format: (val: number) => `${(val * 100).toFixed(1)}%`,
    },
  ];

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4', className)}>
      {kpis.map((kpi) => {
        const isPositive = kpi.trend === 'up';
        const isNegative = kpi.trend === 'down';
        const TrendIcon = isPositive
          ? TrendingUp
          : isNegative
            ? TrendingDown
            : Minus;

        return (
          <Card key={kpi.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div
                className={cn(
                  'flex items-center gap-1 text-xs mt-1',
                  isPositive && 'text-green-600 dark:text-green-400',
                  isNegative && 'text-red-600 dark:text-red-400',
                  !isPositive && !isNegative && 'text-muted-foreground'
                )}
              >
                <TrendIcon className="h-3 w-3" />
                <span>
                  {isPositive ? '+' : ''}
                  {kpi.change > 0 ? kpi.change.toFixed(1) : Math.abs(kpi.change).toFixed(1)}
                  {kpi.label === 'FCR Rate' ? '%' : ''} from last period
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
