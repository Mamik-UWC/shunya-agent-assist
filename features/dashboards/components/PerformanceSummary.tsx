'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AgentPerformance } from '@/types/manager';

export interface PerformanceSummaryProps {
  data?: AgentPerformance['summary'];
  className?: string;
}

export function PerformanceSummary({ data, className }: PerformanceSummaryProps) {
  if (!data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
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

  const metrics = [
    {
      label: 'Total Sessions',
      value: data.totalSessions.toLocaleString(),
      description: 'All time',
    },
    {
      label: 'Avg CSAT',
      value: data.avgCSAT.toFixed(1),
      description: 'Out of 5.0',
      badge: true,
    },
    {
      label: 'Avg FCR',
      value: `${(data.avgFCR * 100).toFixed(1)}%`,
      description: 'First call resolution',
    },
    {
      label: 'Avg Handle Time',
      value: `${Math.floor(data.avgHandleTime / 60)}m ${data.avgHandleTime % 60}s`,
      description: 'Per session',
    },
    {
      label: 'Total Upsells',
      value: data.totalUpsells.toLocaleString(),
      description: 'Successful',
    },
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                {metric.badge && (
                  <Badge variant="outline" className="text-xs">
                    {data.avgCSAT >= 4.5 ? 'Excellent' : data.avgCSAT >= 4.0 ? 'Good' : 'Fair'}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
