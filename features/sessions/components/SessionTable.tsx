'use client';

import * as React from 'react';
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SENTIMENT_COLORS } from '@/constants/manager';

interface SessionListItem {
  id: string;
  agentId: string;
  agentName: string;
  customerId?: string;
  customerName?: string;
  startTime: string;
  endTime?: string;
  duration: number;
  status: 'active' | 'completed' | 'cancelled';
  intent?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  csat?: number;
  fcr: boolean;
}

export interface SessionTableProps {
  sessions?: SessionListItem[];
  loading?: boolean;
  className?: string;
}

type SortField = 'startTime' | 'agentName' | 'duration' | 'csat';
type SortOrder = 'asc' | 'desc';

export function SessionTable({ sessions = [], loading, className }: SessionTableProps) {
  const [sortField, setSortField] = React.useState<SortField>('startTime');
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedSessions = React.useMemo(() => {
    return [...sessions].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'startTime':
          comparison =
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
          break;
        case 'agentName':
          comparison = a.agentName.localeCompare(b.agentName);
          break;
        case 'duration':
          comparison = a.duration - b.duration;
          break;
        case 'csat':
          comparison = (a.csat || 0) - (b.csat || 0);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [sessions, sortField, sortOrder]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const SortButton = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(field)}
      className="h-auto p-0 font-medium hover:bg-transparent"
    >
      {children}
      {sortField === field ? (
        sortOrder === 'asc' ? (
          <ChevronUp className="ml-1 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-1 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
      )}
    </Button>
  );

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <CardDescription>Session list</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (sessions.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <CardDescription>Session list</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No sessions found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sessions ({sessions.length})</CardTitle>
        <CardDescription>Session list</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <SortButton field="startTime">Start Time</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="agentName">Agent</SortButton>
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Intent</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>
                  <SortButton field="duration">Duration</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="csat">CSAT</SortButton>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    {new Date(session.startTime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell className="font-medium">{session.agentName}</TableCell>
                  <TableCell>
                    {session.customerName || session.customerId || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {session.intent ? (
                      <Badge variant="outline">{session.intent}</Badge>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell>
                    {session.sentiment ? (
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: SENTIMENT_COLORS[session.sentiment],
                          color: SENTIMENT_COLORS[session.sentiment],
                        }}
                      >
                        {session.sentiment}
                      </Badge>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell>{formatDuration(session.duration)}</TableCell>
                  <TableCell>
                    {session.csat ? (
                      <Badge variant="outline">{session.csat.toFixed(1)}</Badge>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/manager/sessions/${session.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
