'use client';

import * as React from 'react';
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SessionDetail } from '@/types/manager';

export interface SummaryPanelProps {
  session?: SessionDetail;
  className?: string;
}

export function SummaryPanel({ session, className }: SummaryPanelProps) {
  if (!session) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Summary
        </CardTitle>
        <CardDescription>Session overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {session.summary && (
          <div>
            <h4 className="text-sm font-medium mb-2">AI-Generated Summary</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {session.summary}
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Handle Time</span>
            </div>
            <div className="text-lg font-semibold">
              {Math.floor(session.metrics.handleTime / 60)}m{' '}
              {session.metrics.handleTime % 60}s
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {session.metrics.fcr ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <span>First Call Resolution</span>
            </div>
            <div>
              <Badge variant={session.metrics.fcr ? 'default' : 'destructive'}>
                {session.metrics.fcr ? 'Resolved' : 'Not Resolved'}
              </Badge>
            </div>
          </div>
        </div>
        {session.metadata.tags && session.metadata.tags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {session.metadata.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
