'use client';

import * as React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { SOPAdherenceMetrics } from '@/types/manager';

export interface SOPAdherenceScoreCardProps {
  data?: SOPAdherenceMetrics;
  className?: string;
}

export function SOPAdherenceScoreCard({ data, className }: SOPAdherenceScoreCardProps) {
  if (!data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>SOP Adherence</CardTitle>
          <CardDescription>SOP compliance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-24 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  const isPositive = data.trend > 0;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>SOP Adherence</CardTitle>
        <CardDescription>SOP compliance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Score</span>
            <div className="flex items-center gap-2">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  isPositive ? 'text-green-600' : 'text-red-600'
                )}
              >
                {isPositive ? '+' : ''}
                {data.trend.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Score</span>
              <span className="font-semibold">{data.overall.toFixed(1)}%</span>
            </div>
            <Progress value={data.overall} className="h-2" />
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-sm font-medium">By Category</span>
          <div className="space-y-2">
            {data.byCategory.map((category, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{category.category}</span>
                  <span className="font-medium">{category.score.toFixed(1)}%</span>
                </div>
                <Progress value={category.score} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
