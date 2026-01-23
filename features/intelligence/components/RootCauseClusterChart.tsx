'use client';

import * as React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { INTENT_COLORS } from '@/constants/manager';
import type { IntelligenceInsights } from '@/types/manager';

export interface RootCauseClusterChartProps {
  data?: IntelligenceInsights['rootCauses'];
  className?: string;
}

export function RootCauseClusterChart({ data, className }: RootCauseClusterChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Root Cause Analysis</CardTitle>
          <CardDescription>Clustering of root causes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  // Transform data for scatter chart
  const chartData = data.map((cause, index) => ({
    x: cause.count,
    y: cause.percentage,
    category: cause.category,
    size: cause.count * 10, // Bubble size based on count
    color: INTENT_COLORS[index % INTENT_COLORS.length],
  }));

  const chartConfig = chartData.reduce((acc, item, index) => {
    acc[item.category] = {
      label: item.category,
      color: item.color,
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-background p-3 shadow-sm">
          <div className="grid gap-2">
            <div className="font-medium">{data.category}</div>
            <div className="text-sm">
              <span className="text-muted-foreground">Count:</span>{' '}
              <span className="font-medium">{data.x}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Percentage:</span>{' '}
              <span className="font-medium">{data.y.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Root Cause Analysis</CardTitle>
        <CardDescription>Clustering of root causes by frequency and impact</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="x"
                name="Count"
                label={{ value: 'Frequency (Count)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Percentage"
                label={{ value: 'Impact (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter name="Root Causes" data={chartData} fill="#8884d8">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 space-y-2">
          {data.map((cause, index) => (
            <div key={index} className="flex items-center justify-between text-sm p-2 border rounded">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: INTENT_COLORS[index % INTENT_COLORS.length] }}
                />
                <span className="font-medium">{cause.category}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">{cause.count} occurrences</span>
                <span className="font-medium">{cause.percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
