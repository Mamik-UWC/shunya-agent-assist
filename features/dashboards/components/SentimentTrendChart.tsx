'use client';

import * as React from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SENTIMENT_COLORS } from '@/constants/manager';
import type { SentimentDataPoint } from '@/types/manager';

export interface SentimentTrendChartProps {
  data?: SentimentDataPoint[];
  className?: string;
}

export function SentimentTrendChart({ data, className }: SentimentTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Sentiment Trend</CardTitle>
          <CardDescription>Sentiment analysis over time</CardDescription>
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
    Positive: point.positive,
    Neutral: point.neutral,
    Negative: point.negative,
  }));

  const chartConfig = {
    Positive: {
      label: 'Positive',
      color: SENTIMENT_COLORS.positive,
    },
    Neutral: {
      label: 'Neutral',
      color: SENTIMENT_COLORS.neutral,
    },
    Negative: {
      label: 'Negative',
      color: SENTIMENT_COLORS.negative,
    },
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sentiment Trend</CardTitle>
        <CardDescription>Sentiment analysis over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="Positive"
                stroke={SENTIMENT_COLORS.positive}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="Neutral"
                stroke={SENTIMENT_COLORS.neutral}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="Negative"
                stroke={SENTIMENT_COLORS.negative}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
