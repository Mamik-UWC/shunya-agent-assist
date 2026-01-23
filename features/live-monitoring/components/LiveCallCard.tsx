'use client';

import * as React from 'react';
import { Phone, Clock, User, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SENTIMENT_COLORS, RISK_SEVERITY_COLORS } from '@/constants/manager';
import type { LiveCall } from '@/types/manager';

export interface LiveCallCardProps {
  call: LiveCall;
  onIntervene?: (callId: string) => void;
  className?: string;
}

export function LiveCallCard({ call, onIntervene, className }: LiveCallCardProps) {
  const [duration, setDuration] = React.useState(call.duration);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const startTime = new Date(call.startTime).getTime();
      const now = Date.now();
      setDuration(Math.floor((now - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [call.startTime]);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const hasHighRisk = call.riskFlags.some((flag) => flag.severity === 'high');

  return (
    <Card
      className={className}
      style={
        hasHighRisk
          ? {
              borderColor: RISK_SEVERITY_COLORS.high,
              borderWidth: '2px',
            }
          : undefined
      }
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {call.agentName}
            </CardTitle>
            {call.customerName && (
              <p className="text-sm text-muted-foreground mt-1">{call.customerName}</p>
            )}
          </div>
          <Badge
            variant={
              call.status === 'active'
                ? 'default'
                : call.status === 'on-hold'
                  ? 'secondary'
                  : 'outline'
            }
          >
            {call.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Duration</span>
          </div>
          <span className="font-medium">{formatDuration(duration)}</span>
        </div>
        {call.intent && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Intent</span>
            </div>
            <Badge variant="outline">{call.intent}</Badge>
          </div>
        )}
        {call.sentiment && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sentiment</span>
            <Badge
              variant="outline"
              style={{
                borderColor: SENTIMENT_COLORS[call.sentiment],
                color: SENTIMENT_COLORS[call.sentiment],
              }}
            >
              {call.sentiment}
            </Badge>
          </div>
        )}
        {call.riskFlags.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-amber-600">
              <AlertTriangle className="h-4 w-4" />
              <span>Risk Flags</span>
            </div>
            <div className="space-y-1">
              {call.riskFlags.map((flag, index) => (
                <div
                  key={index}
                  className="text-xs p-2 rounded border"
                  style={{
                    borderColor:
                      flag.severity === 'high'
                        ? RISK_SEVERITY_COLORS.high
                        : flag.severity === 'medium'
                          ? RISK_SEVERITY_COLORS.medium
                          : RISK_SEVERITY_COLORS.low,
                    backgroundColor:
                      flag.severity === 'high'
                        ? `${RISK_SEVERITY_COLORS.high}20`
                        : flag.severity === 'medium'
                          ? `${RISK_SEVERITY_COLORS.medium}20`
                          : `${RISK_SEVERITY_COLORS.low}20`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{flag.type}</span>
                    <Badge
                      variant="outline"
                      style={{
                        borderColor:
                          flag.severity === 'high'
                            ? RISK_SEVERITY_COLORS.high
                            : flag.severity === 'medium'
                              ? RISK_SEVERITY_COLORS.medium
                              : RISK_SEVERITY_COLORS.low,
                        color:
                          flag.severity === 'high'
                            ? RISK_SEVERITY_COLORS.high
                            : flag.severity === 'medium'
                              ? RISK_SEVERITY_COLORS.medium
                              : RISK_SEVERITY_COLORS.low,
                      }}
                    >
                      {flag.severity}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">{flag.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {onIntervene && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onIntervene(call.id)}
          >
            Intervene
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
