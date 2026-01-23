'use client';

import * as React from 'react';
import { Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ComplianceReport as ComplianceReportType } from '../types';

export interface ComplianceReportProps {
  report?: ComplianceReportType;
  className?: string;
}

export function ComplianceReport({
  report,
  className,
}: ComplianceReportProps) {
  if (!report) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Compliance Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Compliance report is not available.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isCompliant = report.status === 'compliant';
  const issues = report.issues || [];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Compliance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          {isCompliant ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <Badge variant="default" className="text-sm">
                Compliant
              </Badge>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 text-red-600" />
              <Badge variant="destructive" className="text-sm">
                Non-Compliant
              </Badge>
            </>
          )}
        </div>
        {issues.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Issues Identified:</h4>
            <ul className="space-y-2">
              {issues.map((issue, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isCompliant && issues.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No compliance issues detected. All requirements were met.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
