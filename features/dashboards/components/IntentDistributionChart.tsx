'use client';

import * as React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { INTENT_COLORS } from '@/constants/manager';
import type { IntentDistribution } from '@/types/manager';

export interface IntentDistributionChartProps {
  data?: IntentDistribution[];
  className?: string;
}

export function IntentDistributionChart({ data, className }: IntentDistributionChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Intent Breakdown</CardTitle>
          <CardDescription>Distribution of call intents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item, index) => ({
    name: item.intent,
    value: item.count,
    percentage: item.percentage,
    color: INTENT_COLORS[index % INTENT_COLORS.length],
  }));

  const chartConfig = chartData.reduce((acc, item) => {
    acc[item.name] = {
      label: item.name,
      color: item.color,
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: data.payload.color }}
              />
              <span className="font-medium">{data.name}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">{data.value}</span> calls (
              {data.payload.percentage.toFixed(1)}%)
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
        <CardTitle>Intent Breakdown</CardTitle>
        <CardDescription>Distribution of call intents</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={600}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
