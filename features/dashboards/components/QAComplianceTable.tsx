'use client';

import * as React from 'react';
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
import { Progress } from '@/components/ui/progress';
import type { AgentPerformance } from '@/types/manager';

export interface QAComplianceTableProps {
  data?: AgentPerformance['qaCompliance'];
  className?: string;
}

export function QAComplianceTable({ data, className }: QAComplianceTableProps) {
  if (!data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>QA Compliance</CardTitle>
          <CardDescription>Quality assurance evaluations</CardDescription>
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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>QA Compliance</CardTitle>
            <CardDescription>Quality assurance evaluations</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{data.score.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">
              {data.passed} passed / {data.failed} failed
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Progress value={data.score} className="h-2" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Evaluator</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.details.map((detail, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(detail.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{detail.score.toFixed(1)}%</span>
                    <Progress value={detail.score} className="h-1.5 w-20" />
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{detail.evaluator}</TableCell>
                <TableCell>
                  <Badge
                    variant={detail.score >= 90 ? 'default' : detail.score >= 80 ? 'secondary' : 'destructive'}
                  >
                    {detail.score >= 90 ? 'Excellent' : detail.score >= 80 ? 'Good' : 'Needs Improvement'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
