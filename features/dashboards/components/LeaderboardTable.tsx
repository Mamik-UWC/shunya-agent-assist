'use client';

import * as React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AgentLeaderboardEntry } from '@/types/manager';

export interface LeaderboardTableProps {
  data?: AgentLeaderboardEntry[];
  className?: string;
}

export function LeaderboardTable({ data, className }: LeaderboardTableProps) {
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Agent Leaderboard</CardTitle>
          <CardDescription>Top performing agents</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm font-medium text-muted-foreground">#{rank}</span>;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Agent Leaderboard</CardTitle>
        <CardDescription>Top performing agents</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Rank</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead className="text-right">Sessions</TableHead>
              <TableHead className="text-right">CSAT</TableHead>
              <TableHead className="text-right">FCR</TableHead>
              <TableHead className="text-right">Avg Handle Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((entry) => (
              <TableRow key={entry.agentId}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getRankIcon(entry.rank)}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{entry.agentName}</TableCell>
                <TableCell className="text-right">{entry.sessions}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">{entry.csat.toFixed(1)}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {(entry.fcr * 100).toFixed(1)}%
                </TableCell>
                <TableCell className="text-right">
                  {Math.floor(entry.avgHandleTime / 60)}m {entry.avgHandleTime % 60}s
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
