'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { managerSocketClient } from '@/lib/realtime/manager-socket';
import type { Alert } from '@/types/manager';
import { cn } from '@/lib/utils';

function formatRelativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

export interface RecentAlertsPanelProps {
  /** Initial alerts (e.g. from REST GET /api/manager/alerts). Real-time alerts append via WebSocket. */
  initialAlerts?: Alert[];
  className?: string;
}

export function RecentAlertsPanel({ initialAlerts = [], className }: RecentAlertsPanelProps) {
  const router = useRouter();
  const [alerts, setAlerts] = React.useState<Alert[]>(initialAlerts);
  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
    const hasWsUrl = Boolean(wsUrl);
    if (!hasWsUrl) {
      setConnected(false);
      return;
    }

    managerSocketClient.connect();
    setConnected(true);

    const unsubscribe = managerSocketClient.subscribeToAlerts((alert) => {
      setAlerts((prev) => [alert, ...prev].slice(0, 50));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAlertClick = (alert: Alert) => {
    if (alert.sessionId) {
      router.push(ROUTES.MANAGER.SESSION_DETAIL(alert.sessionId));
    } else {
      router.push(ROUTES.MANAGER.FLOOR);
    }
  };

  const displayAlerts = alerts.length > 0 ? alerts : initialAlerts;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>
          {connected
            ? 'Updates in real-time via WebSocket'
            : 'Real-time alerts when connected'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {displayAlerts.length === 0 ? (
          <div className="text-sm text-muted-foreground py-6 text-center">
            No recent alerts
          </div>
        ) : (
          <ul className="space-y-2">
            {displayAlerts.map((alert) => (
              <li key={alert.id}>
                <button
                  type="button"
                  onClick={() => handleAlertClick(alert)}
                  className={cn(
                    'w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  )}
                >
                  <span
                    className={cn(
                      'h-2.5 w-2.5 shrink-0 rounded-full',
                      alert.severity === 'critical'
                        ? 'bg-red-500'
                        : 'bg-amber-500'
                    )}
                    aria-hidden
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm">{alert.type}</span>
                    <span className="text-muted-foreground text-sm"> – {alert.agentName}</span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatRelativeTime(alert.timestamp)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
