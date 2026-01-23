'use client';

import * as React from 'react';
import { GraduationCap, Target, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RISK_SEVERITY_COLORS } from '@/constants/manager';
import type { IntelligenceInsights } from '@/types/manager';

export interface TrainingRecommendationsProps {
  data?: IntelligenceInsights['trainingRecommendations'];
  className?: string;
}

export function TrainingRecommendations({ data, className }: TrainingRecommendationsProps) {
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Training Recommendations</CardTitle>
          <CardDescription>AI-generated training suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recommendations available</p>
        </CardContent>
      </Card>
    );
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'medium':
        return <Target className="h-4 w-4 text-amber-600" />;
      default:
        return <GraduationCap className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Training Recommendations
        </CardTitle>
        <CardDescription>AI-generated training suggestions for improvement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((recommendation, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getPriorityIcon(recommendation.priority)}
                  <h4 className="font-medium">
                    {recommendation.agentName
                      ? `${recommendation.agentName} - ${recommendation.area}`
                      : recommendation.area}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">{recommendation.description}</p>
              </div>
              <Badge
                variant="outline"
                style={{
                  borderColor:
                    recommendation.priority === 'high'
                      ? RISK_SEVERITY_COLORS.high
                      : recommendation.priority === 'medium'
                        ? RISK_SEVERITY_COLORS.medium
                        : RISK_SEVERITY_COLORS.low,
                  color:
                    recommendation.priority === 'high'
                      ? RISK_SEVERITY_COLORS.high
                      : recommendation.priority === 'medium'
                        ? RISK_SEVERITY_COLORS.medium
                        : RISK_SEVERITY_COLORS.low,
                }}
              >
                {recommendation.priority} priority
              </Badge>
            </div>
            {recommendation.suggestedTraining.length > 0 && (
              <div>
                <h5 className="text-sm font-medium mb-2">Suggested Training:</h5>
                <div className="flex flex-wrap gap-2">
                  {recommendation.suggestedTraining.map((training, trainingIndex) => (
                    <Badge key={trainingIndex} variant="secondary" className="text-xs">
                      {training}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
