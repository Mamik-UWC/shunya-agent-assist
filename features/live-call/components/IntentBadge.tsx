'use client';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLiveCallStore } from '@/stores/live-call.store';
import { cn } from '@/lib/utils';

export interface IntentBadgeProps {
  className?: string;
}

export function IntentBadge({ className }: IntentBadgeProps) {
  const callData = useLiveCallStore((state) => state.callData);
  const intent = callData?.intent;
  const confidence = (callData?.confidence as number) || 0;

  if (!intent) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-sm">Intent</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline" className="text-muted-foreground">
            Detecting...
          </Badge>
        </CardContent>
      </Card>
    );
  }

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return 'text-green-600';
    if (conf >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceVariant = (conf: number): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (conf >= 0.8) return 'default';
    if (conf >= 0.6) return 'secondary';
    return 'destructive';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm">Detected Intent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge variant={getConfidenceVariant(confidence)} className="text-sm">
          {intent}
        </Badge>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Confidence</span>
            <span className={cn('font-medium', getConfidenceColor(confidence))}>
              {Math.round(confidence * 100)}%
            </span>
          </div>
          <Progress value={confidence * 100} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  );
}
