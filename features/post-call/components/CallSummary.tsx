'use client';

import * as React from 'react';
import { FileText, Calendar, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { PostCallData } from '../types';

export interface CallSummaryProps {
  data?: PostCallData;
  className?: string;
}

export function CallSummary({ data, className }: CallSummaryProps) {
  if (!data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-sm">Call Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No summary available.</p>
        </CardContent>
      </Card>
    );
  }

  const metadata = data.metadata as {
    duration?: number;
    startTime?: string;
    endTime?: string;
    agentName?: string;
    customerName?: string;
  } | undefined;

  const formatDuration = (seconds?: number): string => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <FileText className="h-4 w-4" />
          AI-Generated Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metadata && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            {metadata.duration !== undefined && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{formatDuration(metadata.duration)}</span>
              </div>
            )}
            {metadata.startTime && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Started:</span>
                <span className="font-medium">
                  {new Date(metadata.startTime).toLocaleString()}
                </span>
              </div>
            )}
            {metadata.agentName && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Agent:</span>
                <span className="font-medium">{metadata.agentName}</span>
              </div>
            )}
            {metadata.customerName && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Customer:</span>
                <span className="font-medium">{metadata.customerName}</span>
              </div>
            )}
          </div>
        )}
        {data.summary ? (
          <div className="prose prose-sm max-w-none">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {data.summary}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Summary is being generated...
          </p>
        )}
      </CardContent>
    </Card>
  );
}
