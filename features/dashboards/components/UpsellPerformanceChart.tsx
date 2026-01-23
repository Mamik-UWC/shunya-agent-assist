'use client';

import * as React from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { AgentPerformance } from '@/types/manager';

export interface UpsellPerformanceChartProps {
  data?: AgentPerformance['upsellPerformance'];
  className?: string;
}

export function UpsellPerformanceChart({ data, className }: UpsellPerformanceChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Upsell Performance</CardTitle>
          <CardDescription>Upsell conversion trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((point) => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Opportunities: point.opportunities,
    Conversions: point.conversions,
    Revenue: point.revenue,
  }));

  const chartConfig = {
    Opportunities: {
      label: 'Opportunities',
      color: 'hsl(221, 83%, 53%)',
    },
    Conversions: {
      label: 'Conversions',
      color: 'hsl(142, 76%, 36%)',
    },
    Revenue: {
      label: 'Revenue',
      color: 'hsl(38, 92%, 50%)',
    },
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upsell Performance</CardTitle>
        <CardDescription>Upsell conversion trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar yAxisId="left" dataKey="Opportunities" fill="hsl(221, 83%, 53%)" />
              <Bar yAxisId="left" dataKey="Conversions" fill="hsl(142, 76%, 36%)" />
              <Bar yAxisId="right" dataKey="Revenue" fill="hsl(38, 92%, 50%)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
