'use client';

import * as React from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SENTIMENT_COLORS } from '@/constants/manager';
import type { SessionDetail } from '@/types/manager';

export interface SentimentTimelineProps {
  session?: SessionDetail;
  className?: string;
}

export function SentimentTimeline({ session, className }: SentimentTimelineProps) {
  if (!session || !session.sentimentTimeline || session.sentimentTimeline.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Sentiment Timeline</CardTitle>
          <CardDescription>Sentiment changes during the call</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No sentiment data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = session.sentimentTimeline.map((point) => ({
    time: Math.floor(point.timestamp / 60), // Convert to minutes
    sentiment: point.sentiment,
    confidence: point.confidence,
    positive: point.sentiment === 'positive' ? point.confidence * 100 : 0,
    neutral: point.sentiment === 'neutral' ? point.confidence * 100 : 0,
    negative: point.sentiment === 'negative' ? point.confidence * 100 : 0,
  }));

  const chartConfig = {
    positive: {
      label: 'Positive',
      color: SENTIMENT_COLORS.positive,
    },
    neutral: {
      label: 'Neutral',
      color: SENTIMENT_COLORS.neutral,
    },
    negative: {
      label: 'Negative',
      color: SENTIMENT_COLORS.negative,
    },
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sentiment Timeline</CardTitle>
        <CardDescription>Sentiment changes during the call</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                label={{ value: 'Time (minutes)', position: 'insideBottom', offset: -5 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{ value: 'Confidence (%)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="font-medium">
                            {data.time} minutes
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Sentiment:</span>{' '}
                            <span
                              style={{
                                color:
                                  data.sentiment === 'positive'
                                    ? SENTIMENT_COLORS.positive
                                    : data.sentiment === 'neutral'
                                      ? SENTIMENT_COLORS.neutral
                                      : SENTIMENT_COLORS.negative,
                              }}
                            >
                              {data.sentiment}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Confidence:</span>{' '}
                            {(data.confidence * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="positive"
                stroke={SENTIMENT_COLORS.positive}
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Positive"
              />
              <Line
                type="monotone"
                dataKey="neutral"
                stroke={SENTIMENT_COLORS.neutral}
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Neutral"
              />
              <Line
                type="monotone"
                dataKey="negative"
                stroke={SENTIMENT_COLORS.negative}
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Negative"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
