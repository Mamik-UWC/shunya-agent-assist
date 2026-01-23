'use client';

import * as React from 'react';
import { Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLiveCallStore } from '@/stores/live-call.store';
import { cn } from '@/lib/utils';

export interface LiveCallHeaderProps {
  customerId?: string;
  customerName?: string;
  className?: string;
}

export function LiveCallHeader({
  customerId,
  customerName,
  className,
}: LiveCallHeaderProps) {
  const callData = useLiveCallStore((state) => state.callData);
  const [duration, setDuration] = React.useState(0);

  React.useEffect(() => {
    if (!callData) return;

    const startTime = Date.now() - (callData.duration || 0) * 1000;
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setDuration(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [callData]);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={cn('border-primary/20', className)}>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Duration
            </span>
            <span className="text-lg font-semibold">
              {formatDuration(duration)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col">
            {customerName && (
              <span className="text-sm font-medium">{customerName}</span>
            )}
            {customerId && (
              <span className="text-xs text-muted-foreground">
                ID: {customerId}
              </span>
            )}
            {!customerName && !customerId && (
              <span className="text-sm text-muted-foreground">
                No customer info
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
