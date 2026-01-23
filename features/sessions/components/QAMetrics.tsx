'use client';

import * as React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import type { SessionDetail } from '@/types/manager';

export interface QAMetricsProps {
  session?: SessionDetail;
  className?: string;
}

export function QAMetrics({ session, className }: QAMetricsProps) {
  if (!session || !session.qaMetrics) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>QA Metrics</CardTitle>
          <CardDescription>Quality assurance evaluation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  const qa = session.qaMetrics;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>QA Metrics</CardTitle>
            <CardDescription>Quality assurance evaluation</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{qa.score.toFixed(1)}%</div>
            <Badge
              variant={qa.score >= 90 ? 'default' : qa.score >= 80 ? 'secondary' : 'destructive'}
            >
              {qa.score >= 90 ? 'Excellent' : qa.score >= 80 ? 'Good' : 'Needs Improvement'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {qa.evaluator && (
          <div className="text-sm">
            <span className="text-muted-foreground">Evaluated by:</span>{' '}
            <span className="font-medium">{qa.evaluator}</span>
            {qa.evaluatedAt && (
              <>
                {' '}
                <span className="text-muted-foreground">on</span>{' '}
                <span className="font-medium">
                  {new Date(qa.evaluatedAt).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
        )}
        <div className="space-y-2">
          <Progress value={qa.score} className="h-2" />
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Criteria Breakdown</h4>
          {qa.criteria.map((criterion, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {criterion.score >= criterion.maxScore * 0.8 ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span>{criterion.name}</span>
                </div>
                <span className="font-medium">
                  {criterion.score}/{criterion.maxScore}
                </span>
              </div>
              <Progress
                value={(criterion.score / criterion.maxScore) * 100}
                className="h-1.5"
              />
              {criterion.notes && (
                <p className="text-xs text-muted-foreground ml-6">{criterion.notes}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
