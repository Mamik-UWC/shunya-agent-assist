'use client';

import * as React from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { AgentPerformance } from '@/types/manager';

export interface TrendChartsProps {
  data?: AgentPerformance['trends'];
  className?: string;
}

export function TrendCharts({ data, className }: TrendChartsProps) {
  if (!data || data.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const chartData = data.map((point) => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    CSAT: point.csat,
    FCR: point.fcr * 100,
    HandleTime: point.handleTime,
  }));

  const csatConfig = {
    CSAT: {
      label: 'CSAT',
      color: 'hsl(221, 83%, 53%)',
    },
  };

  const fcrConfig = {
    FCR: {
      label: 'FCR (%)',
      color: 'hsl(142, 76%, 36%)',
    },
  };

  const handleTimeConfig = {
    HandleTime: {
      label: 'Handle Time (seconds)',
      color: 'hsl(38, 92%, 50%)',
    },
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>CSAT Trend</CardTitle>
            <CardDescription>Customer satisfaction over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={csatConfig}>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="CSAT"
                    stroke="hsl(221, 83%, 53%)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FCR Trend</CardTitle>
            <CardDescription>First call resolution rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={fcrConfig}>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="FCR"
                    stroke="hsl(142, 76%, 36%)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
