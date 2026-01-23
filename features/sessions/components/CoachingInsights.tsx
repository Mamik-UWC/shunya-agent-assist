'use client';

import * as React from 'react';
import { Lightbulb, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SessionDetail } from '@/types/manager';

export interface CoachingInsightsProps {
  session?: SessionDetail;
  className?: string;
}

export function CoachingInsights({ session, className }: CoachingInsightsProps) {
  if (!session || !session.coachingInsights) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Coaching Insights</CardTitle>
          <CardDescription>AI-generated coaching recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  const insights = session.coachingInsights;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Coaching Insights
        </CardTitle>
        <CardDescription>AI-generated coaching recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.strengths.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <h4 className="text-sm font-medium">Strengths</h4>
            </div>
            <ul className="space-y-1">
              {insights.strengths.map((strength, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {insights.improvements.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-amber-600" />
              <h4 className="text-sm font-medium">Areas for Improvement</h4>
            </div>
            <ul className="space-y-1">
              {insights.improvements.map((improvement, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {insights.recommendations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-600" />
              <h4 className="text-sm font-medium">Recommendations</h4>
            </div>
            <div className="space-y-2">
              {insights.recommendations.map((recommendation, index) => (
                <Badge key={index} variant="outline" className="block text-left py-2 px-3">
                  {recommendation}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
