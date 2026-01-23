'use client';

import * as React from 'react';
import { DollarSign, TrendingUp, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UpsellMetrics } from '@/types/manager';

export interface UpsellMetricsPanelProps {
  data?: UpsellMetrics;
  className?: string;
}

export function UpsellMetricsPanel({ data, className }: UpsellMetricsPanelProps) {
  if (!data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Upsell Metrics</CardTitle>
          <CardDescription>Upsell performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upsell Metrics</CardTitle>
        <CardDescription>Upsell performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-4 w-4" />
              <span>Opportunities</span>
            </div>
            <div className="text-2xl font-bold">{data.opportunities}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>Conversions</span>
            </div>
            <div className="text-2xl font-bold">{data.conversions}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Conversion Rate</span>
            <Badge variant="outline">{data.conversionRate.toFixed(1)}%</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Revenue</span>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">
                {data.revenue.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Average Value</span>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">
                {data.avgValue.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
