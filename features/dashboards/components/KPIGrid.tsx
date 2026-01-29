'use client';

import * as React from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { KPIMetrics } from '@/types/manager';
import { ROUTES } from '@/constants/routes';

export interface KPIGridProps {
  metrics?: KPIMetrics;
  className?: string;
}

export function KPIGrid({ metrics, className }: KPIGridProps) {
  if (!metrics) {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
        {[1, 2, 3, 4].map((i) => (
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
      label: 'Sessions',
      value: metrics.sessions.total.toLocaleString(),
      change: metrics.sessions.change,
      trend: metrics.sessions.trend,
      href: ROUTES.MANAGER.SESSIONS,
    },
    {
      label: 'Sentiment',
      value: (metrics.sentiment.score >= 0 ? '+' : '') + metrics.sentiment.score.toFixed(2),
      change: metrics.sentiment.change ?? 0,
      trend: metrics.sentiment.trend,
      href: undefined,
    },
    {
      label: 'CSAT',
      value: `${metrics.csat.score}%`,
      change: metrics.csat.change,
      trend: metrics.csat.trend,
      href: undefined,
    },
    {
      label: 'SOP',
      value: `${metrics.sop.percentage}%`,
      change: metrics.sop.change ?? 0,
      trend: metrics.sop.trend,
      href: undefined,
    },
  ];

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {kpis.map((kpi) => {
        const isPositive = kpi.trend === 'up';
        const isNegative = kpi.trend === 'down';
        const TrendIcon = isPositive
          ? TrendingUp
          : isNegative
            ? TrendingDown
            : Minus;

        const content = (
          <>
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
                  {kpi.label === 'CSAT' || kpi.label === 'SOP' ? '%' : ''} from last period
                </span>
              </div>
            </CardContent>
          </>
        );

        if (kpi.href) {
          return (
            <Link key={kpi.label} href={kpi.href}>
              <Card className="transition-colors hover:bg-muted/50 cursor-pointer h-full">
                {content}
              </Card>
            </Link>
          );
        }

        return (
          <Card key={kpi.label} className="h-full">
            {content}
          </Card>
        );
      })}
    </div>
  );
}
