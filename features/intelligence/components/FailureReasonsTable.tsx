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
import { RISK_SEVERITY_COLORS } from '@/constants/manager';
import type { IntelligenceInsights } from '@/types/manager';

export interface FailureReasonsTableProps {
  data?: IntelligenceInsights['failureReasons'];
  className?: string;
}

export function FailureReasonsTable({ data, className }: FailureReasonsTableProps) {
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Failure Reasons</CardTitle>
          <CardDescription>Analysis of failure reasons</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Failure Reasons</CardTitle>
        <CardDescription>Analysis of failure reasons and their impact</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Frequency</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Affected Agents</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((reason, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{reason.reason}</TableCell>
                <TableCell className="text-right">
                  <span className="font-semibold">{reason.frequency}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    style={{
                      borderColor:
                        reason.impact === 'high'
                          ? RISK_SEVERITY_COLORS.high
                          : reason.impact === 'medium'
                            ? RISK_SEVERITY_COLORS.medium
                            : RISK_SEVERITY_COLORS.low,
                      color:
                        reason.impact === 'high'
                          ? RISK_SEVERITY_COLORS.high
                          : reason.impact === 'medium'
                            ? RISK_SEVERITY_COLORS.medium
                            : RISK_SEVERITY_COLORS.low,
                    }}
                  >
                    {reason.impact}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {reason.affectedAgents.map((agent, agentIndex) => (
                      <Badge key={agentIndex} variant="secondary" className="text-xs">
                        {agent}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
