'use client';

import * as React from 'react';
import { Clock, TrendingUp, AlertCircle, MessageSquare, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { KeyMoment } from '../types';

export interface KeyMomentsTimelineProps {
  moments?: KeyMoment[];
  className?: string;
}

const getMomentIcon = (type: KeyMoment['type']) => {
  switch (type) {
    case 'positive':
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    case 'negative':
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    case 'complaint':
      return <ThumbsDown className="h-4 w-4 text-orange-600" />;
    case 'upsell':
      return <TrendingUp className="h-4 w-4 text-blue-600" />;
    case 'neutral':
    default:
      return <MessageSquare className="h-4 w-4 text-gray-600" />;
  }
};

const getMomentVariant = (
  type: KeyMoment['type']
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (type) {
    case 'positive':
    case 'upsell':
      return 'default';
    case 'negative':
    case 'complaint':
      return 'destructive';
    case 'neutral':
    default:
      return 'secondary';
  }
};

const formatTimestamp = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export function KeyMomentsTimeline({
  moments = [],
  className,
}: KeyMomentsTimelineProps) {
  if (moments.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-sm">Key Moments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No key moments identified in this call.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Sort by timestamp
  const sortedMoments = [...moments].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm">Key Moments Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {sortedMoments.map((moment, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                    {getMomentIcon(moment.type)}
                  </div>
                  {index < sortedMoments.length - 1 && (
                    <div className="w-0.5 h-full min-h-[60px] bg-muted mt-2" />
                  )}
                </div>
                <div className="flex-1 space-y-1 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatTimestamp(moment.timestamp)}
                    </div>
                    <Badge variant={getMomentVariant(moment.type)} className="text-xs">
                      {moment.type}
                    </Badge>
                  </div>
                  <p className="text-sm">{moment.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
