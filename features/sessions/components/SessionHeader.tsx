'use client';

import * as React from 'react';
import { Calendar, Clock, User, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SENTIMENT_COLORS } from '@/constants/manager';
import type { SessionDetail } from '@/types/manager';

export interface SessionHeaderProps {
  session?: SessionDetail;
  className?: string;
}

export function SessionHeader({ session, className }: SessionHeaderProps) {
  if (!session) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="h-24 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  const formatDuration = (seconds: number) => {
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
      <CardContent className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-4 flex-1">
            <div>
              <h2 className="text-2xl font-bold mb-2">Session {session.id}</h2>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    session.status === 'completed'
                      ? 'default'
                      : session.status === 'active'
                        ? 'secondary'
                        : 'destructive'
                  }
                >
                  {session.status}
                </Badge>
                {session.intent && (
                  <Badge variant="outline">{session.intent}</Badge>
                )}
                {session.sentiment && (
                  <Badge
                    variant="outline"
                    style={{
                      borderColor: SENTIMENT_COLORS[session.sentiment],
                      color: SENTIMENT_COLORS[session.sentiment],
                    }}
                  >
                    {session.sentiment}
                  </Badge>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Agent:</span>
                <span className="font-medium">{session.agentName}</span>
              </div>
              {session.customerName && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-medium">{session.customerName}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Started:</span>
                <span className="font-medium">
                  {new Date(session.startTime).toLocaleString()}
                </span>
              </div>
              {session.endTime && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Ended:</span>
                  <span className="font-medium">
                    {new Date(session.endTime).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{formatDuration(session.duration)}</span>
              </div>
              {session.metadata.channel && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Channel:</span>
                  <span className="font-medium">{session.metadata.channel}</span>
                </div>
              )}
            </div>
          </div>
          {session.metrics.csat && (
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">CSAT Score</div>
              <div className="text-3xl font-bold">{session.metrics.csat.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">out of 5.0</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
